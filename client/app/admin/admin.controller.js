'use strict';

(function () {

  class AdminController {

    constructor($scope, $location, User) {
      // Use the User $resource to fetch all users
      this.$location = $location;
      this.users = User.query();
    }

    delete(user) {
      user.$remove();
      //this.users.splice(this.users.indexOf(user), 1);
    }
  }

  angular.module('eetApp.admin')
    .controller('AdminController', AdminController);

})();
