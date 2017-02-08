'use strict';

(() => {
  class GalleryController {
    constructor($scope) {
      this.$scope = $scope;
    }

    $onInit() {
      setTimeout(() => {console.log(this.twoWay)}, 3000);
    }
  }
  angular.module('eetApp')
    .component('gallery', {
      controller: GalleryController,
      bindings: {
        twoWay: '=',
        photo: '=',
        editorMode: '<',
        oneWay: '<'
      },
      templateUrl: 'components/gallery/gallery.html'
    });
})();
