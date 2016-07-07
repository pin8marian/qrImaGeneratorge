'use strict';

describe('Component: QrCodeComponent', function () {

  // load the controller's module
  beforeEach(module('qrGeneratorApp'));

  var QrCodeComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    QrCodeComponent = $componentController('QrCodeComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
