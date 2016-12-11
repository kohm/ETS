'use strict';

angular.module('eetApp.catalogue')
  .config(function ($stateProvider) {
    $stateProvider
      .state('catalogue', {
        url: '/catalogue/:id',
        template: function (stateProvider) {
          if (stateProvider.id) {
            return '<catalogue-item></catalogue-item>';
          } else {
            return '<catalogue></catalogue>';
          }
        }
      })
  });
