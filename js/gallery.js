// Scarlet Horizon — listing photo gallery (category filter + lightbox)
(function () {
  var filterButtons = document.querySelectorAll('#gallery-filter-group .filter-btn');
  var grid = document.getElementById('photo-grid');
  if (!grid) return;
  var tiles = Array.prototype.slice.call(grid.querySelectorAll('.photo-tile'));

  var visible = tiles.slice();

  function applyFilter(filter) {
    visible = [];
    tiles.forEach(function (tile) {
      var cat = tile.getAttribute('data-category');
      var show = filter === 'all' || cat === filter;
      tile.style.display = show ? '' : 'none';
      if (show) visible.push(tile);
    });

    filterButtons.forEach(function (btn) {
      var isActive = btn.getAttribute('data-filter') === filter;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    grid.classList.toggle('is-empty', visible.length === 0);
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  applyFilter('all');

  // ---------- Lightbox ----------
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  var lbImg = lightbox.querySelector('.lightbox-figure img');
  var lbCaption = lightbox.querySelector('.lightbox-caption');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');
  var currentIndex = -1;

  function openAt(tile) {
    var idx = visible.indexOf(tile);
    if (idx === -1) return;
    currentIndex = idx;
    render();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function render() {
    var tile = visible[currentIndex];
    if (!tile) return;
    var img = tile.querySelector('img');
    lbImg.src = img.getAttribute('src');
    lbImg.alt = img.getAttribute('alt') || '';
    lbCaption.textContent = tile.getAttribute('data-category') ? tile.getAttribute('data-category-label') : '';
  }

  function close() {
    lightbox.classList.remove('is-open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  function step(delta) {
    if (!visible.length) return;
    currentIndex = (currentIndex + delta + visible.length) % visible.length;
    render();
  }

  tiles.forEach(function (tile) {
    tile.addEventListener('click', function () {
      openAt(tile);
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () { step(-1); });
  nextBtn.addEventListener('click', function () { step(1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
