'use strict';

describe('Service: qrCodeImageService', function () {

  // load the service's module
  beforeEach(module('qrGeneratorApp'));

  // instantiate service
  var qrCodeImageService;
  beforeEach(inject(function (_qrCodeImageService_) {
    qrCodeImageService = _qrCodeImageService_;
  }));

  it('should do something', function () {
    expect(!!qrCodeImageService).toBe(true);
  });

});
