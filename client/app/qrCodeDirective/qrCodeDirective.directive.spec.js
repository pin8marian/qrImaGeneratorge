'use strict';

describe('Directive: qrCodeDirective', function () {

  // load the directive's module and view
  beforeEach(module('qrGeneratorApp'));
  beforeEach(module('app/qrCodeDirective/qrCodeDirective.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<qr-code-directive></qr-code-directive>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the qrCodeDirective directive');
  }));
});
