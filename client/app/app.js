'use strict';

angular.module('qrGeneratorApp', [
  'qrGeneratorApp.auth',
  'qrGeneratorApp.admin',
  'qrGeneratorApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
