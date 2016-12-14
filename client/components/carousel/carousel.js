'use strict';

(() => {
  class CarouselController {
    constructor() {

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
