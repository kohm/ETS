'use strict';

angular.module('eetApp.admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        template: '<admin></admin>',
        authenticate: 'admin'
      })
      .state('admin.items', {
        url: '/items/:id',
        template: function (stateProvider) {
          if (stateProvider.id) {
            return '<item-editor></item-editor>';
          } else {
            return '<admin-items></admin-items>';
          }
        },
        authenticate: 'admin'
      })
      .state('admin.stats', {
        url: '/stats',
        templateUrl: 'app/admin/stats/stats.html',
        controllerAs: 'adminStats',
        authenticate: 'admin'
      })
      .state('admin.suppliers', {
        url: '/suppliers/:id',
        template: '<admin-suppliers></admin-suppliers>',
        authenticate: 'admin'
      })
      .state('admin.users', {
        url: '/users',
        template: '<admin-users></admin-users>',
        authenticate: 'admin'
      });
  });
