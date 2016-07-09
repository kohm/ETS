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
    delete(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }

  }

  angular.module('eetApp.admin')
    .controller('AdminUsersController', AdminUsersController);

})();
