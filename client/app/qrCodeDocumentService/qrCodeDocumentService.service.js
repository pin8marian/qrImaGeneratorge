'use strict';

angular.module('qrGeneratorApp')
  .service('qrCodeDocumentService', function ($http, $location, Auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var that= this;

    that.getLoggedUser= function()
    {
      return Auth.getCurrentUser();
    }

    //object to sent when we save the document
    that.documentToSave={};
    return {
      //get the last inserted document
      getLastQrDocument: function(){
          var id=that.getLoggedUser()._id;
          return $http.get('/api/qrCodes/'+id);
      },

      //save the document
      //this method will always be called inside of teh saveQrCodeImage
      saveQrDocument: function(qrImageInfo)
      {
        that.documentToSave.userId=that.getLoggedUser();
        that.documentToSave.url=qrImageInfo.url;
        that.documentToSave.el=qrImageInfo.el;
        that.documentToSave.format=qrImageInfo.format;
        that.documentToSave.pathToFile= qrImageInfo.pathToFile;
        that.documentToSave.dateGenerated=Date.now();
        that.documentToSave.lastAccess=Date.now();
        return  $http.post('/api/qrCodes', that.documentToSave);
      },
      //update the last acces field document everytime a user access the qr-image page and we have records in DB
      updateQrDocumentLastAccess: function(documentToUpdate)
      {
        documentToUpdate.lastAccess=Date.now();
        return  $http.put('/api/qrCodes/'+documentToUpdate._id, documentToUpdate);
      }
    }
  });
