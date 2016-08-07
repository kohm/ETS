'use strict';

(function() {

  function SupplierResourse($resource) {
    return $resource('/api/suppliers/:id', {
      id: '@_id'
    }, {
      updateSettings: {
        method: 'PUT',
        params: {
          controller: 'settings'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });
  }

  angular.module('eetApp')
    .factory('Supplier', SupplierResourse);

})();
