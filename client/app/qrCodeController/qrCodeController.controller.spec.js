'use strict';

describe('Controller: QrCodeControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('qrGeneratorApp'));

  var QrCodeControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QrCodeControllerCtrl = $controller('QrCodeControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
