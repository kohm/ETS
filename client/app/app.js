'use strict';

angular.module('eetApp', [
  'eetApp.auth',
  'eetApp.admin',
  'eetApp.constants',
  'eetApp.catalogue',
  'angularSpinner',
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
  .config(['ngToastProvider', 'usSpinnerConfigProvider', '$urlRouterProvider', '$locationProvider', function(ngToast, usSpinnerConfigProvider, $urlRouterProvider, $locationProvider) {
    usSpinnerConfigProvider.setDefaults({
      lines: 7,

      corners: 1,
      color: '#245b61',
      opacity: 0.15,
      direction: 1,
      speed: 1,
      trail: 20,
      width: 5,
      zIndex: 2e9
    });
    ngToast.configure({
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      maxNumber: 3
    });

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  }]);
