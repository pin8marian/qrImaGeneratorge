'use strict';

describe('Service: qrCodeDocumentService', function () {

  // load the service's module
  beforeEach(module('qrGeneratorApp'));

  // instantiate service
  var qrCodeDocumentService;
  beforeEach(inject(function (_qrCodeDocumentService_) {
    qrCodeDocumentService = _qrCodeDocumentService_;
  }));

  it('should do something', function () {
    expect(!!qrCodeDocumentService).toBe(true);
  });

});
