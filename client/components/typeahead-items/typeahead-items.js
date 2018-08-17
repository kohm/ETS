'use strict';

(function () {

  class TypeaheadItem {
    constructor(Item) {
      this.Item = Item;
      this.items = [];
      this.strSearch = '';
    }

    $onInit() {
      console.log(this.Item);
    }

    search(strSearch) {
      return this.Item.smartFind({string: strSearch});
    }

  }

  angular.module('eetApp')
    .component('typeaheadItem', {
      templateUrl: 'components/typeahead-items/typeahead-items.html',
      controller: TypeaheadItem
    })

})();
