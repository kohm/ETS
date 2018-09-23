'use strict';

(function () {

  class AdminSellController {
    constructor() {
      this.itemList = [];
    }
  }

  angular.module('eetApp.admin')
    .component('adminSell', {
      controller: AdminSellController,
      templateUrl: 'app/admin/sell/admin.sell.html'
    })

})();
