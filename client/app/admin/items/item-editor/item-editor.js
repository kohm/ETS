'use strict';

(function () {

  class ItemEditor {

    constructor($location, $scope, $timeout, Item) {
      // Use the User $resource to fetch all users
      this.$location = $location;
      this.$timeout = $timeout;
      this.$scope = $scope;
      this.Item = Item;
      this.items = [];
      this.searchingEvent = false;
      this.strSearch = '';
    }
  }
  angular.module('eetApp')
    .component('itemEditor', {
      templateUrl: 'app/admin/items/item-editor/item-editor.html',
      controller: ItemEditor
    })

})();
