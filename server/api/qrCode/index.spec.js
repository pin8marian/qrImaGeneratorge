'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var qrCodeCtrlStub = {
  index: 'qrCodeCtrl.index',
  show: 'qrCodeCtrl.show',
  create: 'qrCodeCtrl.create',
  update: 'qrCodeCtrl.update',
  destroy: 'qrCodeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var qrCodeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './qrCode.controller': qrCodeCtrlStub
});

describe('QrCode API Router:', function() {

  it('should return an express router instance', function() {
    qrCodeIndex.should.equal(routerStub);
  });

  describe('GET /api/qrCodes', function() {

    it('should route to qrCode.controller.index', function() {
      routerStub.get
        .withArgs('/', 'qrCodeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/qrCodes/:id', function() {

    it('should route to qrCode.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'qrCodeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/qrCodes', function() {

    it('should route to qrCode.controller.create', function() {
      routerStub.post
        .withArgs('/', 'qrCodeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/qrCodes/:id', function() {

    it('should route to qrCode.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'qrCodeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/qrCodes/:id', function() {

    it('should route to qrCode.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'qrCodeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/qrCodes/:id', function() {

    it('should route to qrCode.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'qrCodeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
