'use strict';

(() => {
  class CarouselController {
    constructor($scope) {
      this.$scope = $scope;
    }

    $onInit() {
      setTimeout(() => {console.log(this.twoWay)}, 3000);
    }
  }
  angular.module('eetApp')
    .component('carousel', {
      controller: CarouselController,
      bindings: {
        twoWay: '=',
        editorMode: '<',
        oneWay: '<'
      },
      templateUrl: 'components/carousel/carousel.html'
    });
})();
