'use strict';

(function() {

  function ItemResourse($resource) {
    return $resource('/api/items/:id', {
      id: '@_id'
    }, {
      getBrands: { //TODO fix this shit, finish this method | add a new one to get one item
        method: 'GET',
        params: {
          controller: 'brands'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'brands'
        }
      }
    });
  }

  angular.module('eetApp')
    .factory('Item', ItemResourse);

})();
