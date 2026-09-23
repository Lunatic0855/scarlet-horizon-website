// Scarlet Horizon — home page listing filter (All stays / Tiny homes / Campers)
(function () {
  var filterButtons = document.querySelectorAll('#filter-group .filter-btn');
  var cards = document.querySelectorAll('#listings-grid .listing-card');

  if (!filterButtons.length || !cards.length) return;

  function applyFilter(filter) {
    cards.forEach(function (card) {
      var cat = card.getAttribute('data-cat');
      var show = filter === 'all' || cat === filter;
      card.style.display = show ? '' : 'none';
    });

    filterButtons.forEach(function (btn) {
      var isActive = btn.getAttribute('data-filter') === filter;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  // Initial state: show all
  applyFilter('all');
})();
