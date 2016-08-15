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
      this.supplier = {};
      form.name = '';
      form.legalName = '';
      form.taxId = '';
      form.contactName = '';
      form.email = '';
      form.phone = '';
      form.phoneAlt = '';
      form.fax = '';
      form.address = '';
      form.country = '';
      form.state = '';
      form.city = '';
      form.$setPristine();
      form.$setUntouched();
    }

    register(form) {
      this.submitted = true;

      if (form.$valid) {
        let newItem = {
          age: this.item.age,
          barCode: this.item.barCode,
          brand: this.item.brand,
          description: this.item.description,
          gender: {female: this.item.gender.female, male: this.item.gender.male},
          name: this.item.name,
          price: {cost: this.item.price.cost, list: this.item.price.list},
          tags: this.item.tags.map(obj => obj.text)
        };
        console.log(newItem);
        this.Item.save(newItem).$promise
          .then((data) => {
            //clean form
            //this.users = this.Supplier.query();
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
