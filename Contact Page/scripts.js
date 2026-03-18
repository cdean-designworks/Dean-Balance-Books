document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const thankYou = document.getElementById('thank-you');
  const homeBtn = document.getElementById('home-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();  // ← Prevents reload / Web3Forms default page

    const formData = new FormData(form);

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Hide form
        form.style.display = "none";

        // Show thank-you
        if (thankYou) {
          thankYou.style.display = "block";
          thankYou.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        alert("Error: " + (data.message || "Something went wrong."));
      }
    } catch (err) {
      alert("Network error. Please try again or email me directly.");
    } finally {
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    }
  });

  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      // Redirect to home page
      window.location.href = "index.html";  
      // or "/" for root domain, or "https://yourdomain.com/"
    });
  }
});
// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}
