/* ===== Portfolio Filter & Lightbox ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-grid .portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeScale 0.5s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('portfolio-lightbox');
  if (!lightbox) return;
  const lbImg = lightbox.querySelector('.lb-image');
  const lbTitle = lightbox.querySelector('.lb-title');
  const lbDesc = lightbox.querySelector('.lb-desc');
  const lbClose = lightbox.querySelector('.lb-close');

  document.querySelectorAll('.portfolio-item[data-title]').forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src = item.querySelector('img').src;
      lbTitle.textContent = item.getAttribute('data-title');
      lbDesc.textContent = item.getAttribute('data-desc') || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
});

// Fade scale animation
const style = document.createElement('style');
style.textContent = `
@keyframes fadeScale {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
/* Lightbox */
.portfolio-lightbox {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.9);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; visibility: hidden; transition: all 0.4s;
  padding: 40px;
}
.portfolio-lightbox.active { opacity: 1; visibility: visible; }
.lb-close {
  position: absolute; top: 20px; right: 30px;
  font-size: 2rem; color: #fff; cursor: pointer;
  transition: color 0.3s;
}
.lb-close:hover { color: var(--primary); }
.lb-content { max-width: 800px; text-align: center; }
.lb-content .lb-image { max-width: 100%; max-height: 60vh; border-radius: 12px; margin-bottom: 20px; }
.lb-content .lb-title { font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 8px; }
.lb-content .lb-desc { color: var(--text-secondary); font-size: 0.92rem; }
`;
document.head.appendChild(style);
