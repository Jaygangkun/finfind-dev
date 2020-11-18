(function() {
  // Variables
  var nav = document.querySelector('.header__navigation');
  var navToggle = document.querySelector('.header__navigation--toggle');
  var closeToggle = document.querySelector('.header__close--toggle');

  // Functions
  function domReady(callback) {
    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  function toggleNav() {
    nav.classList.toggle('open');
    navToggle.classList.toggle('hide');
    closeToggle.classList.toggle('show');
  }

  function closeNav() {
    nav.classList.remove('open');
    navToggle.classList.remove('hide');
    closeToggle.classList.remove('show');
  }

  // Event Listeners
  domReady(function() {
    if (!document.body || !navToggle) {
      return;
    } else {
      navToggle.addEventListener('click', toggleNav);
      closeToggle.addEventListener('click', closeNav);
    }
  });
})();
