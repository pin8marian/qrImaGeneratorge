'use strict';


angular.module('qrGeneratorApp')
  .directive('qrCodeDirective', function () {
    return {
      templateUrl: 'app/qrCodeDirective/qrCodeDirective.html', //this is template URL for this directive
      restrict: 'EA', //this is restricted to be use only as element or attribute
      replace: true, //the content it will replace the HTML element
      link: function (scope, element, attrs) {
      }
    };
  });
