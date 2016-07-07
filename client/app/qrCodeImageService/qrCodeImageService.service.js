'use strict';

angular.module('qrGeneratorApp')
  .service('qrCodeImageService', function ($http, $location, Auth) {
    //take the service context
     var that= this;
     that.generatedRandNumber='';
     //this is use to create the file name
     that.randNumber=function()
     {
       return Math.floor(Math.random() * (10000 +1) + 1);
     };

     //current url: E.g: http://localhost:9000
     that.baseQrImageUrl= $location.protocol() + "://" + $location.host()+ ":"+$location.port();
     //file extension
     that.qrCodeFormat='png';
     //the folder from/to read/save qr images
     that.imageFolder='/qr-images/';

     that.getLoggedUser= function()
     {
       return Auth.getCurrentUser();
     }
     //objest to be sent when we save the image on server
     that.elemToSaveOnServer={};

     return {
       getBaseUrl: function()
       {
         return that.baseQrImageUrl;
       },

       //get the qr image base on file name
       getQrCodeImage: function(imageId){
         return $http.get('/api/qrCodeGen/'+imageId);
       },
         //save qr image on the server
         saveQrCodeImage: function(urlToEncode){
           that.elemToSaveOnServer.url=urlToEncode;
           that.elemToSaveOnServer.el='H';
           that.elemToSaveOnServer.format= that.qrCodeFormat;
           that.generatedRandNumber=that.randNumber();
           that.elemToSaveOnServer.fileName=that.getLoggedUser()._id+"@"+that.generatedRandNumber+'.'+that.qrCodeFormat;
           that.elemToSaveOnServer.pathToFile=that.imageFolder+that.elemToSaveOnServer.fileName;
           return $http.post("/api/qrCodeGen", { qrImageParam: that.elemToSaveOnServer});
       },


     }
});
