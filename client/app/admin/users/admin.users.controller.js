'use strict';

(function () {

  class AdminUsersController {

    constructor($scope, $location, User) {
      // Use the User $resource to fetch all users
      this.$location = $location;
      this.users = User.query();
    }
    alertLocation() {
      alert(this.$location.path());
    }
  }

  angular.module('eetApp.admin')
    .controller('AdminUsersController', AdminUsersController);

})();
