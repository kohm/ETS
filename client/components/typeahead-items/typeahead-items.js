'use strict';

(function () {

  class TypeaheadItem {
    constructor(Item, $localStorage) {
      this.Item = Item;
      this.$storage = $localStorage;
      this.customPopupSelected = '';
      this.strSearch = '';
    }

    search(strSearch) {
      return this.Item.smartFind({string: strSearch}).$promise
        .then((data) => {
          return data;
        });
    }

    insertItem(item) {
      item['amount']  = 1;
      this.itemList.push(item);
      this.$storage.sellItemList = this.itemList;
      this.customPopupSelected = '';
      console.log(this.itemList);
    }

  }

  angular.module('eetApp')
    .component('typeaheadItem', {
      templateUrl: 'components/typeahead-items/typeahead-items.html',
      controller: TypeaheadItem,
      bindings: {
        itemList: '='
      }
    })

})();
