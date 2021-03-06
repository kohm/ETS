'use strict';

(function () {

  class SmartSearch {

    constructor($location, $scope, $timeout, Item) {
      // Use the User $resource to fetch all users
      this.$location = $location;
      this.$timeout = $timeout;
      this.$scope = $scope;
      this.Item = Item;
      this.items = [];
      this.itemsFound = false;
      this.searchingEvent = false;
      this.strSearch = '';
    }

    $onInit() {
      //make sure that the item exists
      this.Item.findOne().$promise
        .then((data) => {
          console.log(data);
          this.itemsFound = true;
        })
        .catch((err) => {
          this.itemsFound = false;
        });
    }

    search(strSearch) {
      if (strSearch.length) {
        this.items = this.Item.smartFind({string: strSearch});
        console.log(this.items);
        this.searchingEvent = false;
      } else {

      }
    }
  }
  angular.module('eetApp')
    .component('smartSearch', {
      templateUrl: 'components/smart-search/smart-search.html',
      controller: SmartSearch
    })

})();
