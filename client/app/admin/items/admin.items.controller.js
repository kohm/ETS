'use strict';

(function () {

  class AdminItemsController {

    constructor($scope, $location, $q, Auth, Item, ngToast, socket, Supplier) {
      this.$location = $location;
      this.Auth = Auth;
      this.supplier = Supplier;
      this.Item = Item;
      //TODO Find only suppliers names
      this.suppliers = Supplier.query();
      this.ngToast = ngToast;
      this.item = {};
      this.items = [];
      this.minPattern = /^\d+$/;
      this.errors = {};
      this.savedBrands = [];
      this.showProductForm = false;
      this.socket = socket;
      this.availableSuppliers = [];
      this.submitted = false;
      this.suppliersRequired = false;

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('item');
      });
    }

    $onInit() {
      this.suppliers.$promise.then((data) => {
        if (data.length > 0) {
          this.suppliersRequired = true;
          this.availableSuppliers = data.map(obj => {return { _id: obj._id, name: obj.name}});
        }
      });
      this.item.gender = {male: true, female: true};
      this.savedBrands = this.Item.getBrands();
      this.socket.syncUpdates('item', this.savedBrands, (event, item, array) => {
        if (event == 'created') {array[array.length -1] = item.brand}
      });
    }

    showForm() {
      if (this.suppliersRequired) {
        this.showProductForm = !this.showProductForm;
      } else {
        this.ngToast.warning({
          content: '<p><strong>No hay proveedores</strong> para asociar la creación de un nuevo producto, </br> si el producto va a ser agregado por la misma empresa, por favor agregala como proveedora :).</br> Podés hacerlo en la sección de proveedores</p>',
          dismissOnClick: true
        });
      }
    }

    reset(form) {
      this.item = {};
      form.age = '';
      form.name = '';
      form.barCode = '';
      form.brand = '';
      form.description = '';
      form['gender.male'] = true;
      form['gender.female'] = true;
      form['price.cost'] = '';
      form['price.list'] = '';
      form.tags = [];
      form.$setPristine();
      form.$setUntouched();
    }
    test() {
    }
    register(form) {
      this.submitted = true;

      if (form.$valid) {
        let newItem = {};
        newItem = this.item;
        if (this.item.tags) {newItem.tags = this.item.tags.map(obj => obj.text)}
        if (this.item.suppliers) {newItem.suppliers = this.item.suppliers.map(obj => obj._id)}
        this.Item.save(newItem).$promise
          .then((data) => {
            this.ngToast.success({
              content: '<p>Producto creado! :)</p>',
              dismissOnClick: true
            });
            this.errors = {};
            this.reset(form);
          })
          .catch(err => {
            err = err.data;
            this.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, (error, field) => {
              if (field.includes('suppliers')) {field = 'suppliers'}
              form[field].$setValidity('mongoose', false);
              this.errors[field] = error.message;
            });
          });
      }
    }
  }

  angular.module('eetApp.admin')
    .component('adminItems', {
      controller: AdminItemsController,
      controllerAs: 'adminItems',
      templateUrl: 'app/admin/items/items.html'
    })

})();
