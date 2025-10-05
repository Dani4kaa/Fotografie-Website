document.addEventListener('DOMContentLoaded', () => {
  // ===================== EMAIL OBFSUCATION =====================
  const formEncoded = "ZGFuaVdhMTIzNEB3ZWIuZGU="; // atob -> daniWa1234@web.de
  const footerEncoded = "SmFuYVdhbGxARm90b2dyYXBoaWUuZGU="; // atob -> JanaWall@Fotografie.de

  try {
    const decodedFormMail = atob(formEncoded);
    const decodedFooterMail = atob(footerEncoded);

    // Formular-Ziel-E-Mail setzen
    const encryptedMailInput = document.getElementById('encryptedMail');
    if (encryptedMailInput) {
      encryptedMailInput.value = decodedFormMail;
    }

    // Footer-Mail setzen
    const footerEmailAnchor = document.getElementById('footerEmail');
    if (footerEmailAnchor) {
      footerEmailAnchor.href = 'mailto:' + decodedFooterMail;
      footerEmailAnchor.textContent = decodedFooterMail;
    }
  } catch (e) {
    console.error("Fehler beim Dekodieren der E-Mail:", e);
  }

  // ===================== GALERIE DYNAMISCH =====================
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

  // ===================== NAVBAR ANIMATION =====================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const standardPadding = 16;
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

  // ===================== KONTAKTFORMULAR AJAX + RESET =====================
  const kontaktForm = document.getElementById('kontaktForm');
  if (kontaktForm) {
    kontaktForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Normales Absenden verhindern

      const formData = new FormData(kontaktForm);

      try {
        const response = await fetch('https://formsubmit.co/ajax/' + formData.get('_to'), {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          alert("Vielen Danke! Deine Nachricht wurde gesendet. Ich melde mich in kürze bei euch");
          kontaktForm.reset(); // Felder leeren
        } else {
          alert("Oops! Etwas ist schiefgelaufen.");
        }
      } catch (err) {
        alert("Fehler beim Senden der Nachricht.");
        console.error(err);
      }
    });
  }

  // ===================== SCROLL RESTORATION =====================
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
});

// Navbar Bürger script schließen
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        // Bootstrap Collapse API
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true
        });
      }
    });
  });
});

// ===================== FEEDBACK SYSTEM =====================
const feedbackContainer = document.getElementById('feedbackContainer');
const feedbackText = document.getElementById('feedbackText');
const submitFeedback = document.getElementById('submitFeedback');
const stars = document.querySelectorAll('.star-rating .star');
let rating = 0;

if (stars.length) {
  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      highlightStars(star.dataset.value);
    });
    star.addEventListener('mouseout', () => {
      highlightStars(rating);
    });
    star.addEventListener('click', () => {
      rating = star.dataset.value;
      highlightStars(rating);
    });
  });

  function highlightStars(rating) {
    stars.forEach(star => {
      star.classList.toggle('filled', star.dataset.value <= rating);
    });
  }
}

if (submitFeedback) {
  submitFeedback.addEventListener('click', () => {
    const text = feedbackText.value.trim();
    if (!text || rating == 0) {
      alert('Bitte gebe eine Bewertung und Text ein!');
      return;
    }

    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <div class="d-flex align-items-center mb-1">
        ${'&#9733;'.repeat(rating)}${'&#9734;'.repeat(5 - rating)}
      </div>
      <p>${text}</p>
    `;
    feedbackContainer.prepend(li);

    // Reset
    feedbackText.value = '';
    rating = 0;
    highlightStars(0);
  });
}

// FEEDBACK SLIDER
const feedbackItems = document.querySelectorAll('#feedbackList .feedback-item');
let currentIndex = 0;

function showNextFeedback() {
  currentIndex++;
  if (currentIndex >= feedbackItems.length) currentIndex = 0;
  const offset = -currentIndex * 120; // Höhe der einzelnen Items
  document.getElementById('feedbackList').style.transform = `translateY(${offset}px)`;
}

// Automatisch alle 4 Sekunden wechseln
setInterval(showNextFeedback, 4000);

