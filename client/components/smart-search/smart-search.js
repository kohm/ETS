'use strict';

(function () {

  class SmartSearch {

    constructor($scope, $location) {
      // Use the User $resource to fetch all users
      this.$location = $location;
      this.$scope = $scope;
    }
  }

  angular.module('eetApp')
    .component('smartSearch', {
      templateUrl: 'components/smart-search/smart-search.html',
      controller: SmartSearch
    })

})();
