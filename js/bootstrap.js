(function() {

  'use strict';

  // add logo
  var containers = document.getElementsByClassName('logo-container');
  containers[0].appendChild(logo());

  // add hamburger menu
  var isShowingSidebar;
  var navbars = document.getElementsByTagName('nav');

  function slideInNavbar() {

    if(isShowingSidebar) {

      navbars[0].style.transform = 'translateX(-250px)';
      isShowingSidebar = false;

    } else {

      navbars[0].style.transform = 'translateX(0px)';
      isShowingSidebar = true;

    }
  }

  var spec = {

    callback: slideInNavbar

  };

  containers = document.getElementsByClassName('hamburger-menu-container__centered-container');
  containers[0].appendChild(hamburgerMenu(spec));

})();
