/* ===== Contact Form Validation ===== */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const msg = document.getElementById('form-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message').value.trim();

    // Reset
    msg.className = 'form-message';
    msg.style.display = 'none';

    if (!name || !email || !message) {
      msg.textContent = 'Please fill in all required fields.';
      msg.className = 'form-message error';
      msg.style.display = 'block';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = 'Please enter a valid email address.';
      msg.className = 'form-message error';
      msg.style.display = 'block';
      return;
    }

    // Simulate sending
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-arrow-repeat spin-icon"></i> Sending...';

    setTimeout(() => {
      msg.textContent = 'Your message has been sent successfully! We\'ll get back to you within 24 hours.';
      msg.className = 'form-message success';
      msg.style.display = 'block';
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-send"></i> Send Message';
    }, 1500);
  });
});

// Add spin animation
const style = document.createElement('style');
style.textContent = `.spin-icon { display: inline-block; animation: spin 1s linear infinite; }`;
document.head.appendChild(style);
