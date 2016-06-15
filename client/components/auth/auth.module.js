'use strict';

angular.module('eetApp.auth', [
  'eetApp.constants',
  'eetApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
