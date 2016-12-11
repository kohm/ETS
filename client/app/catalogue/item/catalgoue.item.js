'use strict';

(() => {
  class CatalogueItemController {
    constructor($scope) {
      this.$scope = $scope
    }
  }

  angular.module('eetApp.catalogue')
    .component('catalogueItem', {
      controller: CatalogueItemController,
      controllerAs: 'catalogueItem',
      templateUrl: 'app/catalogue/item/catalogue.item.html'
    });
})();
