/* ============================================================
   Lakeshore Plumbing — JavaScript
   Handles: mobile nav toggle, footer year, contact form AJAX
   ============================================================ */

// ---- Footer: current year ----
document.getElementById('year').textContent = new Date().getFullYear();


// ---- Mobile nav toggle ----
const menuBtn   = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen   = document.getElementById('icon-open');
const iconClose  = document.getElementById('icon-close');

function openMenu() {
  mobileMenu.classList.remove('hidden');
  iconOpen.classList.add('hidden');
  iconClose.classList.remove('hidden');
}

function closeMenu() {
  mobileMenu.classList.add('hidden');
  iconOpen.classList.remove('hidden');
  iconClose.classList.add('hidden');
}

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.contains('hidden') ? openMenu() : closeMenu();
});

// Close menu when any mobile nav link is tapped
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});


// ---- Contact form: AJAX submission via Formspree ----
const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const successMsg = document.getElementById('form-success');
const errorMsg   = document.getElementById('form-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Hide previous messages
  successMsg.classList.add('hidden');
  errorMsg.classList.add('hidden');

  // Disable button while submitting
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      successMsg.classList.remove('hidden');
    } else {
      // Formspree returns JSON errors; surface them if available
      const data = await response.json().catch(() => ({}));
      console.error('Formspree error:', data);
      errorMsg.classList.remove('hidden');
    }
  } catch (err) {
    console.error('Network error:', err);
    errorMsg.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});
