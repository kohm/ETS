'use strict';

(function () {

  class CatalogueController {

    constructor($scope, $location) {
      this.$location = $location;
      
    }
  }

  angular.module('eetApp.catalogue')
    .component('catalogue', {
      controller: CatalogueController,
      controllerAs: 'catalogue',
      templateUrl: 'app/catalogue/catalogue.html'
    })

})();
