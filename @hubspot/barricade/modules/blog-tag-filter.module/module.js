(function() {
  // Variables
  var blogTagSelect = document.querySelector('#blog-filter__category');

  // Functions
  blogTagSelect.addEventListener('change', function() {
    if (blogTagSelect.value) {
      window.location = blogTagSelect.value;
    }
    return false;
  });
})();
