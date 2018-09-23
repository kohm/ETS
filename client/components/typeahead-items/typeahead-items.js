'use strict';

(function () {

  class TypeaheadItem {
    constructor(Item) {
      this.Item = Item;
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
      this.itemList.push(item);
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
