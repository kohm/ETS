'use strict';

(function () {

  class AdminController {

    constructor($scope, $location, User) {
      // Use the User $resource to fetch all users
      this.$location = $location;
      this.users = User.query();
      this.wideSideBar = false;
      this.$scope = $scope;
    }

    delete(user) {
      user.$remove();
      //this.users.splice(this.users.indexOf(user), 1);
    }
  }

  angular.module('eetApp.admin')
    .component('admin', {
      templateUrl: 'app/admin/admin.html',
      controller: AdminController
    })

})();
