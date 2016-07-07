/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/qrCodes              ->  index
 * POST    /api/qrCodes              ->  create
 * GET     /api/qrCodes/:id          ->  show
 * PUT     /api/qrCodes/:id          ->  update
 * DELETE  /api/qrCodes/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import QrCode from './qrCode.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of QrCodes
export function index(req, res) {
  return QrCode.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single QrCode from the DB
export function show(req, res) {

  //get the last generated code for the logged user
  return QrCode.find({userId: req.params.id})
                .limit(1)
                .sort({ dateGenerated: -1 })
                .exec()
                .then(handleEntityNotFound(res))
                .then(respondWithResult(res))
                .catch(handleError(res));
}

// Creates a new QrCode in the DB
export function create(req, res) {
  return QrCode.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing QrCode in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return QrCode.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a QrCode from the DB
export function destroy(req, res) {
  return QrCode.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
