'use strict';

(function() {

  function MpApi($resource) {
    return $resource('/api/mpapi/:id', {
      id: '@_id'
    }, {
      init_point: {
        method: 'GET',
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
    .factory('MpApi', MpApi);

})();
