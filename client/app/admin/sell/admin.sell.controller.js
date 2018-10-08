'use strict';

(function () {

  class AdminSellController {

    constructor($scope, $localStorage) {
      this.$storage = $localStorage;
      this.itemList = $localStorage.sellItemList || [];
    }

    deleteItem(index) {
      this.itemList.splice(index, 1);
      this.$storage.sellItemList = this.itemList;
    }

    resetList() {
      this.itemList = this.$storage.sellItemList = [];
    }

  }

  angular.module('eetApp.admin')
    .component('adminSell', {
      controller: AdminSellController,
      templateUrl: 'app/admin/sell/admin.sell.html'
    })

})();
