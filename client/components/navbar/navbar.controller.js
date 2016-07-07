'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Qr Code',
    'state': 'qrCode' // I change to point to qr code generator page
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('qrGeneratorApp')
  .controller('NavbarController', NavbarController);
