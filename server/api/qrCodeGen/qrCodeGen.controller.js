/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/qrCodeGen              ->  index
 * POST    /api/qrCodeGen              ->  create
 * GET     /api/qrCodeGen/:id          ->  show
 * PUT     /api/qrCodeGen/:id          ->  update
 * DELETE  /api/qrCodeGen/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import QrCodeGen from './qrCodeGen.model';
import qr from 'qr-image';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp'; // I added this to recursively create folders

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


//return the path where to store the qr images
function getQrImagePathToSave()
{
  return path.join(__dirname,'../../../client/qr-images/');
}
// Gets a list of QrCodeGens
export function index(req, res) {
  return QrCodeGen.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single QrCodeGen from the DB
export function show(req, res) {
  // return QrCodeGen.findById(req.params.id).exec()
  //   .then(handleEntityNotFound(res))
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
  // res.write(parvalues);
  // res.end();
    // fs.exists(fileName, function(exists) {
    // if (exists) {
    //   fs.stat(fileName, function(error, stats) {
    //     fs.open(fileName, "r", function(error, fd) {
    //       var buffer = new Buffer(stats.size);
    //         console.log( "Buffer lenght "+buffer.length);
    //       fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
    //           console.log( "bytesRead "+bytesRead);
    //         var data = buffer.toString("utf8", 0, buffer.length);
    //
    //         console.log(data);
    //         fs.close(fd);
    //         res.send(data);
    //       });
    //     });
    //   });
    // }
    res.send('/qr-images/'+req.params.id);
    res.end();

}

// Creates a new QrCodeGen in the DB
export function create(req, res) {
  //return QrCodeGen.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));

  var qrImageParameters=req.body.qrImageParam;
   //generate the qr image using the image method of qr-image library. Creates readable stream with image data
   var qr_png = qr.image(qrImageParameters.url, { ec_level: qrImageParameters.el, type: qrImageParameters.format  });

   //path where to save the imate
   var dir=getQrImagePathToSave();
   //create the path if not exists

   //we us mkdirp function of mkdirp library. Creates directories recursively.
   mkdirp.sync(dir, function (err) {});

   //create the file path including the name and format
   var filePathIncludeFileName=dir+qrImageParameters.fileName;
   //create the writeable stream
   var readiableImage=fs.createWriteStream(filePathIncludeFileName);

   //pipe the writeable stream into the readable stream
    qr_png.pipe(readiableImage);

    //check if the file has been created
    //console.log(fs.lstatSync(filePathIncludeName).isFile());
    // var FileExists=fs.stat(filePathIncludeName);
    // if(FileExists.isFile())
    // {
    //   res.send(true);
    // }
    // else {
    //   res.send(false);
    // }
    //TODO: send the base64 format to display in the front end
    //res.send(fs.readFileSync(filePathIncludeName).toString('base64'));
    // fs.stat(filePathIncludeName, function(err, data){
    //   if()
    // });
    //send the image path to display
    res.send(req.body.qrImageParam);

    //end of the journey
    res.end()
}

// Updates an existing QrCodeGen in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return QrCodeGen.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a QrCodeGen from the DB
export function destroy(req, res) {
  return QrCodeGen.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
