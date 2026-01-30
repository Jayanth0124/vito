export const initFooter = (scope: Document | HTMLElement = document) => {
  // We search for the footer container ONLY inside the provided scope (the new page)
  const footerContainer = scope.querySelector('#global-footer');
  
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer>
      <div class="container">
        <div class="footer-top">
          <div class="footer-col">
            <img src="/footer.png" alt="Vito Ginglies" class="footer-logo" style="max-width: 150px; margin-bottom: 1.5rem;">
            <p class="footer-desc">
              Designing dreams with functional spaces that reflect personality and lifestyle. Premium men's jackets tailored for the bold.
            </p>
            
            <div class="footer-socials">
              <a href="mailto:info@vitoginglies.com" class="social-link" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" class="social-link" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Collections</h4>
            <ul>
              <li><a href="shop.html">Formal Jackets</a></li>
              <li><a href="shop.html">Bomber Jackets</a></li>
              <li><a href="shop.html">Sporty Editions</a></li>
              <li><a href="shop.html">Casual Wear</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="terms.html">Terms & Conditions</a></li>
              <li><a href="privacy.html">Privacy Policy</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Contact Info</h4>
            <div class="footer-contact-item">
              <span>📞</span> <span>+91 6309113898</span>
            </div>
            <div class="footer-contact-item">
              <span>✉️</span> <span>info@vitoginglies.com</span>
            </div>
            <div class="footer-contact-item">
              <span>📍</span> <span>KMK Elite Durga Nagar,<br>Hyderabad, Telangana</span>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2026 Vito Ginglies. All Rights Reserved.</p>
          <p>Designed for Excellence.</p>
        </div>
      </div>
    </footer>
  `;
};