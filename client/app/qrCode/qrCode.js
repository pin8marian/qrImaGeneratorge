'use strict';

angular.module('qrGeneratorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('qrCode', {
        url: '/qrCode',
        //template: '<qr-code></qr-code>' ,
        templateUrl:'app/qrCode/qrCode.html',
        controller:"QrCodeControllerCtrl",
        authenticate: true //protect the page. THe user must be logged to view the page
      });
  });
