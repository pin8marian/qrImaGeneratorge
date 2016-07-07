'use strict';

var app = require('../..');
import request from 'supertest';

var newQrCode;

describe('QrCode API:', function() {

  describe('GET /api/qrCodes', function() {
    var qrCodes;

    beforeEach(function(done) {
      request(app)
        .get('/api/qrCodes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          qrCodes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      qrCodes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/qrCodes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/qrCodes')
        .send({
          name: 'New QrCode',
          info: 'This is the brand new qrCode!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newQrCode = res.body;
          done();
        });
    });

    it('should respond with the newly created qrCode', function() {
      newQrCode.name.should.equal('New QrCode');
      newQrCode.info.should.equal('This is the brand new qrCode!!!');
    });

  });

  describe('GET /api/qrCodes/:id', function() {
    var qrCode;

    beforeEach(function(done) {
      request(app)
        .get('/api/qrCodes/' + newQrCode._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          qrCode = res.body;
          done();
        });
    });

    afterEach(function() {
      qrCode = {};
    });

    it('should respond with the requested qrCode', function() {
      qrCode.name.should.equal('New QrCode');
      qrCode.info.should.equal('This is the brand new qrCode!!!');
    });

  });

  describe('PUT /api/qrCodes/:id', function() {
    var updatedQrCode;

    beforeEach(function(done) {
      request(app)
        .put('/api/qrCodes/' + newQrCode._id)
        .send({
          name: 'Updated QrCode',
          info: 'This is the updated qrCode!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedQrCode = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQrCode = {};
    });

    it('should respond with the updated qrCode', function() {
      updatedQrCode.name.should.equal('Updated QrCode');
      updatedQrCode.info.should.equal('This is the updated qrCode!!!');
    });

  });

  describe('DELETE /api/qrCodes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/qrCodes/' + newQrCode._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when qrCode does not exist', function(done) {
      request(app)
        .delete('/api/qrCodes/' + newQrCode._id)
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
