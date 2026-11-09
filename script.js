document.addEventListener('DOMContentLoaded', () => {
  // === 1. HIGHLIGHT NAVIGASI AKTIF (LATAR KUNING) ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.page-links a, .nav-item');

  navItems.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active-nav');
    } else {
      link.classList.remove('active-nav');
    }
  });

  // === 2. POP-UP MODAL GAMBAR SMOOTH ===
  let modal = document.querySelector('.image-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
      <span class="modal-close">&times;</span>
      <img class="modal-content" id="modal-img" alt="Preview Gambar">
      <div id="modal-caption" style="margin-top:16px; color:#B8AAA2; font-size:14px;"></div>
    `;
    document.body.appendChild(modal);
  }

  const modalImg = document.getElementById('modal-img');
  const captionText = document.getElementById('modal-caption');
  const closeBtn = modal.querySelector('.modal-close');

  const previewImages = document.querySelectorAll('img.clickable-preview');
  previewImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      modal.classList.add('show');
      modalImg.src = img.src;
      captionText.innerHTML = img.alt || 'Preview Gambar';
    });
  });

  const closeModal = () => modal.classList.remove('show');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // === 3. FILTER KATALOG PROYEK (WORK.HTML) ===
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // === 4. PENGIRIMAN FORM CONTACT VIA AJAX (FORMSUBMIT TO DWIKYWIKI69@GMAIL.COM) ===
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = 'Sending... ⏳';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          alert('Terima kasih! Pesan dan detail proyek Anda berhasil terkirim ke dwikiwiki69@gmail.com.');
          contactForm.reset();
        } else {
          alert('Terjadi kendala saat pengiriman. Silakan coba lagi atau email langsung ke dwikiwiki69@gmail.com.');
        }
      } catch (error) {
        alert('Terjadi masalah koneksi internet. Silakan email langsung ke dwikiwiki69@gmail.com.');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});