'use strict';

var app = require('../..');
import request from 'supertest';

var newQrCodeGen;

describe('QrCodeGen API:', function() {

  describe('GET /api/qrCodeGen', function() {
    var qrCodeGens;

    beforeEach(function(done) {
      request(app)
        .get('/api/qrCodeGen')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          qrCodeGens = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      qrCodeGens.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/qrCodeGen', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/qrCodeGen')
        .send({
          name: 'New QrCodeGen',
          info: 'This is the brand new qrCodeGen!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newQrCodeGen = res.body;
          done();
        });
    });

    it('should respond with the newly created qrCodeGen', function() {
      newQrCodeGen.name.should.equal('New QrCodeGen');
      newQrCodeGen.info.should.equal('This is the brand new qrCodeGen!!!');
    });

  });

  describe('GET /api/qrCodeGen/:id', function() {
    var qrCodeGen;

    beforeEach(function(done) {
      request(app)
        .get('/api/qrCodeGen/' + newQrCodeGen._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          qrCodeGen = res.body;
          done();
        });
    });

    afterEach(function() {
      qrCodeGen = {};
    });

    it('should respond with the requested qrCodeGen', function() {
      qrCodeGen.name.should.equal('New QrCodeGen');
      qrCodeGen.info.should.equal('This is the brand new qrCodeGen!!!');
    });

  });

  describe('PUT /api/qrCodeGen/:id', function() {
    var updatedQrCodeGen;

    beforeEach(function(done) {
      request(app)
        .put('/api/qrCodeGen/' + newQrCodeGen._id)
        .send({
          name: 'Updated QrCodeGen',
          info: 'This is the updated qrCodeGen!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedQrCodeGen = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQrCodeGen = {};
    });

    it('should respond with the updated qrCodeGen', function() {
      updatedQrCodeGen.name.should.equal('Updated QrCodeGen');
      updatedQrCodeGen.info.should.equal('This is the updated qrCodeGen!!!');
    });

  });

  describe('DELETE /api/qrCodeGen/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/qrCodeGen/' + newQrCodeGen._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when qrCodeGen does not exist', function(done) {
      request(app)
        .delete('/api/qrCodeGen/' + newQrCodeGen._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
