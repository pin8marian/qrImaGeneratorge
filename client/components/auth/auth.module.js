'use strict';

angular.module('qrGeneratorApp.auth', [
  'qrGeneratorApp.constants',
  'qrGeneratorApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
