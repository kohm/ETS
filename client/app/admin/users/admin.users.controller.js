'use strict';

(function () {

  class AdminUsersController {

    constructor($scope, $location, Auth, User) {
      // Use the User $resource to fetch all users
      this.$location = $location;
      this.Auth = Auth;
      this.users = User.query();
      this.user = {};
      this.errors = {};
      this.submitted = false;
    }

    alertLocation() {
      alert(this.$location.path());
    }

    delete(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }

    enable(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }

    disable(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }

    register(form) {
      //TODO Remove login/redirection/interceptor when a new user is registered
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
            // Account created, redirect to home
            this.users.push(newUser);
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

  angular.module('eetApp.admin')
    .controller('AdminUsersController', AdminUsersController);

})();
