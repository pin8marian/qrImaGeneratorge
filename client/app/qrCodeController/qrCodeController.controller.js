'use strict';

angular.module('qrGeneratorApp')
  .controller('QrCodeControllerCtrl', function ($scope, qrCodeImageService, qrCodeDocumentService) {
    //get local scope
    var scope=$scope;
    //set de default URl to encode
    scope.UrlToEncode="http://google.ro";

    //get the last generated code for the current user
    scope.getLastQrDocument=function(){

      qrCodeDocumentService.getLastQrDocument().success(function(data){
          if(data.length>0)
          {
            var returnedData=data[0];
            //set the url
            scope.UrlToEncode=returnedData.url;
            //set the image url
            scope.imageUrl=returnedData.pathToFile;

            //update the last access field for the document
            qrCodeDocumentService.updateQrDocumentLastAccess(returnedData).success(function(data){
                console.log("Update the last access date");
            });
          }

      });
    };

    scope.getLastQrDocument();

    //save Qr image file on the server and the document
    scope.saveQrImage = function() {
      //save image
        qrCodeImageService.saveQrCodeImage(scope.UrlToEncode).success(function(data) {
            //save the document
            qrCodeDocumentService.saveQrDocument(data).success(function(data){
            //set the image URL
            scope.imageUrl=data.pathToFile;
          });
        }).error(function(data, status) {
          console.error('Something went wrong', status, data);
        });
    };
  });
