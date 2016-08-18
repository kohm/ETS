'use strict';

(function () {

  class AdminItemsController {

    constructor($scope, $location, $q, Auth, Item, ngToast, socket, Supplier) {
      this.$location = $location;
      this.Auth = Auth;
      this.supplier = Supplier;
      this.Item = Item;
      this.suppliers = Supplier.query();
      this.ngToast = ngToast;
      this.item = {};
      this.items = [];
      this.minPattern = /^\d+$/;
      this.errors = {};
      this.showProductForm = false;
      this.socket = socket;
      this.suppliersTagsText = [];
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
          this.suppliersTagsText = data.map(obj => {return { id: obj._id, name: obj.name}});
        }
      });
      this.item.gender = {male: true, female: true};
      this.socket.syncUpdates('item', this.items);
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
    //TODO fix this shit
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
      console.log(this.Item.getBrands());
    }
    register(form) {
      this.submitted = true;
      console.log(form);
      console.log(form['price.cost']);

      if (form.$valid) {
        let newItem = {};
        newItem = this.item;
        if (this.item.tags) {newItem.tags = this.item.tags.map(obj => obj.text)}
        console.log(newItem);
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
              console.log(field);
              console.log(form[field]);
              console.log(form);
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
