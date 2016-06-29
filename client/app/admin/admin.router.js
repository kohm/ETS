'use strict';

angular.module('eetApp.admin')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin'
      })
      .state('admin.items', {
        url: '/items',
        templateUrl: 'app/admin/items/items.html',
        controllerAs: 'adminItems'
      })
      .state('admin.stats', {
        url: '/stats',
        templateUrl: 'app/admin/stats/stats.html',
        controllerAs: 'adminStats'
      })
      .state('admin.suppliers', {
        url: '/suppliers',
        templateUrl: 'app/admin/suppliers/suppliers.html',
        controllerAs: 'adminSuppliers'
      });
  });
