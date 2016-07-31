'use strict';

(function () {

  class AdminUsersController {

    constructor($scope, $location, Auth, User) {
      // Use the User $resource to fetch all users
      this.$location = $location;
      this.Auth = Auth;
      this.users = User.query();
      this.User = User;
      this.user = {};
      this.errors = {};
      this.submitted = false;
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
    reset(form) {
      this.user = {};
      form.password = '';
      form.confirmPassword = '';
      form.$setPristine();
      form.$setUntouched();
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

  angular.module('eetApp.admin')
    .controller('AdminUsersController', AdminUsersController);

})();
