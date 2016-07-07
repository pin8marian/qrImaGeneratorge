'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var qrCodeGenCtrlStub = {
  index: 'qrCodeGenCtrl.index',
  show: 'qrCodeGenCtrl.show',
  create: 'qrCodeGenCtrl.create',
  update: 'qrCodeGenCtrl.update',
  destroy: 'qrCodeGenCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var qrCodeGenIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './qrCodeGen.controller': qrCodeGenCtrlStub
});

describe('QrCodeGen API Router:', function() {

  it('should return an express router instance', function() {
    qrCodeGenIndex.should.equal(routerStub);
  });

  describe('GET /api/qrCodeGen', function() {

    it('should route to qrCodeGen.controller.index', function() {
      routerStub.get
        .withArgs('/', 'qrCodeGenCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/qrCodeGen/:id', function() {

    it('should route to qrCodeGen.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'qrCodeGenCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/qrCodeGen', function() {

    it('should route to qrCodeGen.controller.create', function() {
      routerStub.post
        .withArgs('/', 'qrCodeGenCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/qrCodeGen/:id', function() {

    it('should route to qrCodeGen.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'qrCodeGenCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/qrCodeGen/:id', function() {

    it('should route to qrCodeGen.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'qrCodeGenCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/qrCodeGen/:id', function() {

    it('should route to qrCodeGen.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'qrCodeGenCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
