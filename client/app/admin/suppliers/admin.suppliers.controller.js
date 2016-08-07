'use strict';

(function () {

  class AdminSuppliersController {

    constructor($scope, $location, $q, Auth, Supplier) {
      this.$location = $location;
      this.Auth = Auth;
      this.Supplier = Supplier;
      this.supplier = {};
      this.errors = {};
      this.submitted = false;
    }

    reset(form) {
      this.supplier = {};
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
            this.errors = {};
            this.reset(form);
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
