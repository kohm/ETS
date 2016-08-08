'use strict';

(function () {

  class AdminUsersController {

    constructor($scope, $location, Auth, socket, User) {
      // Use the User $resource to fetch all users
      this.$location = $location;
      this.Auth = Auth;
      this.socket = socket;
      this.users = User.query();
      this.User = User;
      this.user = {};
      this.errors = {};
      this.submitted = false;
      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('user');
      });
    }

    $onInit() {
      this.socket.syncUpdates('user', this.users);
    }

    delete(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }

    enable(user) {
      let updateUser = {
        _id: user._id,
        enabled: user.enabled
      };
      if (user.enabled) {
        updateUser.enabled = false;
        this.Auth.updateSettings(updateUser).then(() => user.enabled = false);
      } else {
        updateUser.enabled = true;
        this.Auth.updateSettings(updateUser).then(() => user.enabled = true);
      }

    }

    disable(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }

    reset(form) {
      this.user = {};
      form.password = '';
      form.confirmPassword = '';
      form.$setPristine();
      form.$setUntouched();
    }

    register(form) {
      this.submitted = true;

      if (form.$valid) {
        let newUser = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          role: this.user.role
        };
        this.Auth.createUser(newUser)
          .then(() => {
            //clean form
            this.users = this.User.query();
            this.user = {};
            this.errors = {};
            form.name = '';
            form.email = '';
            form.password = '';
            form.confirmPassword = '';
            form.$setPristine();
            form.$setUntouched();
          })
          .catch(err => {
            err = err.data;
            this.errors = {};
            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, (error, field) => {
              form[field].$setValidity('mongoose', false);
              this.errors[field] = error.message;
            });
          });
      }
    }
  }

  angular.module('eetApp')
    .component('adminUsers', {
      controller: AdminUsersController,
      controllerAs: 'adminUsers',
      templateUrl: 'app/admin/users/users.html'
    })

})();
