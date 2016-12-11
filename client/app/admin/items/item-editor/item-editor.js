'use strict';

(function () {

  class ItemEditor {

    constructor($location, $q, $scope, $timeout, Item, $state, $stateParams) {
      // Use the User $resource to fetch all users
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.Item = Item;
    }

    $onInit() {
      console.log(this.$stateParams);
      this.Item.get({id: this.$stateParams.id}).$promise
        .then((data) => {
          this.item = data;
        })
        .catch((er) => {
          console.log(er);
          this.$state.go('^');
        })
    }

  }

  angular.module('eetApp')
    .component('itemEditor', {
      templateUrl: 'app/admin/items/item-editor/item-editor.html',
      controller: ItemEditor
    })

})();
