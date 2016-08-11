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
        url: '/items',
        templateUrl: 'app/admin/items/items.html',
        controllerAs: 'adminItems',
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
