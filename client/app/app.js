'use strict';

angular.module('eetApp', [
  'eetApp.auth',
  'eetApp.admin',
  'eetApp.constants',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTagsInput',
  'ngToast',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(['ngToastProvider', '$urlRouterProvider', '$locationProvider', function(ngToast, $urlRouterProvider, $locationProvider) {
    ngToast.configure({
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      maxNumber: 3
    });

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  }]);
