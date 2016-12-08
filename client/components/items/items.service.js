'use strict';
//TODO Learn about resource and check the getBrands method
(function() {

  function ItemResource($resource) {
    return $resource('/api/items/:id/:controller', {
      id: '@_id'
    }, {
      getBrands: {
        method: 'GET',
        isArray: true,
        params: {
          id: 'me',
          controller: 'brands'
        }
      },
      findOne: {
        method: 'GET',
        params: {
          id: 'me',
          controller: 'findOne'
        }
      },
      typeAhead: {
        method: 'GET',
        isArray: true,
        params: {
          id: 'me',
          controller: 'typeAhead'
        }
      },
      smartFind: {
        method: 'GET',
        isArray: true,
        params: {
          id: 'me',
          controller: 'smartFind'
        }
      }
    });
  }

  angular.module('eetApp')
    .factory('Item', ItemResource);

})();
