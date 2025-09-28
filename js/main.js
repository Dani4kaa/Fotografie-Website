document.addEventListener('DOMContentLoaded', () => {
  // Galerie Bilder dynamisch laden
  const bilder = [
    'bootstrap/bilder/arbeit1.jpg',
    'bootstrap/bilder/arbeit2.jpg',
    'bootstrap/bilder/arbeit3.jpg',
    'bootstrap/bilder/arbeit4.jpg',
    'bootstrap/bilder/arbeit5.jpg',
    'bootstrap/bilder/arbeit6.jpg'
  ];

  const carouselInner = document.getElementById('carouselInner');
  if (carouselInner) {
    const chunkSize = 3;
    for (let i = 0; i < bilder.length; i += chunkSize) {
      const chunk = bilder.slice(i, i + chunkSize);
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (i === 0) carouselItem.classList.add('active');

      const row = document.createElement('div');
      row.className = 'row';

      chunk.forEach(src => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Galerie Bild";
        img.className = 'gallery-img';
        col.appendChild(img);
        row.appendChild(col);
      });

      carouselItem.appendChild(row);
      carouselInner.appendChild(carouselItem);
    }
  }

  // Navbar Animation beim Scrollen
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const standardPadding = 16; // px
    const maxPadding = 26;
    const minPadding = 10;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY) {
        let newPadding = standardPadding + (currentScroll / 20);
        if (newPadding > maxPadding) newPadding = maxPadding;
        navbar.style.padding = newPadding + "px 0";
      } else {
        let newPadding = standardPadding - ((standardPadding - minPadding) * (currentScroll / 50));
        if (newPadding < minPadding) newPadding = minPadding;
        navbar.style.padding = newPadding + "px 0";
      }

      clearTimeout(window.navbarTimeout);
      window.navbarTimeout = setTimeout(() => {
        navbar.style.padding = standardPadding + "px 0";
      }, 250);

      lastScrollY = currentScroll;
    });
  }

  // Immer oben starten
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
});
