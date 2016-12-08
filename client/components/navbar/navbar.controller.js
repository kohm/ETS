'use strict';

class NavbarController {
  //start-non-standard
  menu = [
    {'title': 'Inicio','state': 'main'},
    {'title': 'Catalogo', 'state': 'catalogue'}];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('eetApp')
  .controller('NavbarController', NavbarController);
