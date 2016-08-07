'use strict';

(function () {

  class AdminSuppliersController {

    constructor($scope, $location, $q, Auth, User, Supplier) {
      // Use the User $resource to fetch all users
      this.$location = $location;
      this.Auth = Auth;
      this.Supplier = Supplier;
      this.supplier = {};
      this.users = User.query();
      this.User = User;
      this.errors = {};
      this.submitted = false;
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
        let newSupplier = {
          name: this.supplier.name,
          legalName: this.supplier.legalName,
          taxId: this.supplier.taxId,
          contactName: this.supplier.contactName,
          email: this.supplier.email,
          phone: this.supplier.phone,
          phoneAlt: this.supplier.phoneAlt,
          fax: this.supplier.fax,
          address: this.supplier.address,
          country: this.supplier.country,
          state: this.supplier.state,
          city: this.supplier.city
        };
        
        this.Supplier.save(newSupplier).$promise
          .then((data) => {
            //clean form
            //this.users = this.Supplier.query();
            this.supplier = {};
            this.errors = {};
            form.name= '';
            form.legalName= '';
            form.taxId= '';
            form.contactName= '';
            form.email= '';
            form.phone= '';
            form.phoneAlt= '';
            form.fax= '';
            form.address= '';
            form.country= '';
            form.state= '';
            form.city= '';
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
    .controller('AdminSuppliersController', AdminSuppliersController);

})();
