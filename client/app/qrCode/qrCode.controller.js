'use strict';
(function(){

class QrCodeComponent {
}

angular.module('qrGeneratorApp')
  .component('qrCode', {
    templateUrl: 'app/qrCode/qrCode.html',
    controller: QrCodeComponent
  });

})();
