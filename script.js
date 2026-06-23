/**
 * script.js - Impresa di Pulizie
 * Interazioni: menu mobile, smooth scroll, form validazione, contatori,
 * FAQ accordion, scroll spy, animazioni on-scroll, back-to-top.
 */

(function () {
  'use strict';

  /* ============================================
     0. THEME TOGGLE (Dark/Light Mode)
     ============================================ */
  var themeToggle = document.querySelector('.theme-toggle');
  var storedTheme = localStorage.getItem('theme');

  // Applica tema salvato o preferenza di sistema
  if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      if (current === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  /* ============================================
     1. MOBILE MENU TOGGLE
     ============================================ */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('is-open');
    mobileMenu.classList.toggle('is-open');
    hamburger.classList.toggle('is-active');
    hamburger.setAttribute('aria-expanded', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', toggleMenu);
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* ============================================
     2. SMOOTH SCROLL per anchor links interni
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10) || 72;
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================
     3. SCROLL SPY - evidenzia link attivo nella navbar
     ============================================ */
  var navLinks = document.querySelectorAll('.nav__link[data-section]');
  if (navLinks.length > 0) {
    var sections = [];
    navLinks.forEach(function (link) {
      var sectionId = link.getAttribute('data-section');
      var el = document.getElementById(sectionId);
      if (el) sections.push({ id: sectionId, el: el, link: link });
    });

    function updateScrollSpy() {
      var scrollPos = window.pageYOffset + 120;

      for (var i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el.offsetTop <= scrollPos) {
          navLinks.forEach(function (l) { l.classList.remove('is-active'); });
          sections[i].link.classList.add('is-active');
          break;
        }
      }
    }

    window.addEventListener('scroll', updateScrollSpy, { passive: true });
    updateScrollSpy();
  }

  /* ============================================
     4. SCROLL ANIMATIONS (fade-in on scroll)
     Usa IntersectionObserver per performance
     ============================================ */
  var fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }

  /* ============================================
     5. FAQ ACCORDION
     ============================================ */
  var faqQuestions = document.querySelectorAll('.faq-item__question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        var answer = this.nextElementSibling;

        // Chiudi tutti gli altri (opzionale - comportamento accordion singolo)
        faqQuestions.forEach(function (otherBtn) {
          if (otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            otherBtn.nextElementSibling.classList.remove('is-open');
          }
        });

        // Toggle corrente
        this.setAttribute('aria-expanded', !expanded);
        answer.classList.toggle('is-open');
      });
    });
  }

  /* ============================================
     6. BACK TO TOP BUTTON
     ============================================ */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ============================================
     8. FORM VALIDAZIONE + EMAILJS INTEGRAZIONE
     (solo se il form è presente sulla pagina)
     ============================================ */
  var form = document.getElementById('contact-form');
  if (form) {
    // --- EmailJS Config Placeholder ---
    var EMAILJS_PUBLIC_KEY = 'ohQ2pBkRhgzxfiY02';
    var EMAILJS_SERVICE_ID = 'service_21ve4rd';
    var EMAILJS_TEMPLATE_ID = 'template_iygvimz';

    // Carica SDK EmailJS in modo asincrono (non bloccante)
    function loadEmailJS() {
      return new Promise(function (resolve, reject) {
        if (window.emailjs) { resolve(); return; }
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.onload = resolve;
        script.onerror = function () { console.error('Errore caricamento EmailJS SDK.'); reject(); };
        document.head.appendChild(script);
      });
    }

    // Inizializza EmailJS quando la pagina è pronta
    loadEmailJS().then(function () {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }).catch(function () {
      console.warn('EmailJS non disponibile - verifica le credenziali di configurazione.');
    });

    /* --- Validazione helper --- */
    function showError(inputEl, errorEl) {
      inputEl.classList.add('is-error');
      inputEl.classList.remove('is-valid');
      if (errorEl) errorEl.classList.add('is-visible');
    }

    function showValid(inputEl, errorEl) {
      inputEl.classList.remove('is-error');
      inputEl.classList.add('is-valid');
      if (errorEl) errorEl.classList.remove('is-visible');
    }

    function clearState(inputEl, errorEl) {
      inputEl.classList.remove('is-error', 'is-valid');
      if (errorEl) errorEl.classList.remove('is-visible');
    }

    /* --- Validatori per campo --- */
    var validators = {
      'contact-name': function (value) {
        return value.trim().length >= 2;
      },
      'contact-email': function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
      },
      'contact-phone': function (value) {
        if (!value.trim()) return true;
        return /^[+]?[\d\s\-]{6,20}$/.test(value.trim());
      },
      'contact-message': function (value) {
        return value.trim().length >= 10;
      }
    };

    /* --- Validazione in tempo reale (on blur e on input) --- */
    Object.keys(validators).forEach(function (fieldId) {
      var input = document.getElementById(fieldId);
      if (!input) return;
      var errorEl = document.getElementById('error-' + fieldId.replace('contact-', ''));

      input.addEventListener('blur', function () {
        if (input.value.trim() === '') {
          clearState(input, errorEl);
          return;
        }
        validators[fieldId](input.value) ? showValid(input, errorEl) : showError(input, errorEl);
      });

      input.addEventListener('input', function () {
        if (input.classList.contains('is-error')) {
          if (validators[fieldId](input.value)) {
            showValid(input, errorEl);
          }
        }
      });
    });

    /* --- Submit del form --- */
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;

      // Validazione globale di tutti i campi obbligatori
      Object.keys(validators).forEach(function (fieldId) {
        var input = document.getElementById(fieldId);
        if (!input) return;
        var errorEl = document.getElementById('error-' + fieldId.replace('contact-', ''));
        var value = input.value.trim();

        var isRequired = input.hasAttribute('required');
        if (isRequired && value === '') {
          showError(input, errorEl);
          isValid = false;
          return;
        }

        if (value !== '' && !validators[fieldId](value)) {
          showError(input, errorEl);
          isValid = false;
        } else if (value !== '') {
          showValid(input, errorEl);
        } else {
          clearState(input, errorEl);
        }
      });

      if (!isValid) return;

      // Disabilita bottone durante l'invio
      var submitBtn = document.getElementById('submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Invio in corso...';

      /* --- Raccolta parametri del form --- */
      var templateParams = {
        from_name: document.getElementById('contact-name').value.trim(),
        from_email: document.getElementById('contact-email').value.trim(),
        phone: document.getElementById('contact-phone').value.trim() || 'Non fornito',
        service_type: document.getElementById('contact-service') ? document.getElementById('contact-service').value : 'Non selezionato',
        preferred_time: document.getElementById('contact-time') ? document.getElementById('contact-time').value : 'Non specificata',
        message: document.getElementById('contact-message').value.trim(),
        subject: 'Nuova richiesta preventivo dal sito web'
      };

      // Invia tramite EmailJS (con fallback se non configurato)
      if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        console.log('=== EMAILJS NON CONFIGURATO ===');
        console.log('Parametri del form:', templateParams);

        // Simula un invio riuscito per demo
        setTimeout(function () {
          document.getElementById('form-success').classList.add('is-visible');
          form.reset();
          Object.keys(validators).forEach(function (fieldId) {
            var input = document.getElementById(fieldId);
            var errorEl = document.getElementById('error-' + fieldId.replace('contact-', ''));
            clearState(input, errorEl);
          });
          submitBtn.disabled = false;
          submitBtn.textContent = 'Invia Richiesta';
        }, 800);

      } else {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
          .then(function () {
            document.getElementById('form-success').classList.add('is-visible');
            form.reset();
            Object.keys(validators).forEach(function (fieldId) {
              var input = document.getElementById(fieldId);
              var errorEl = document.getElementById('error-' + fieldId.replace('contact-', ''));
              clearState(input, errorEl);
            });
          }, function (error) {
            console.error('Errore invio EmailJS:', error);
            alert('Si è verificato un errore durante l\'invio. Riprova o contattaci telefonicamente.');
          })
          .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Invia Richiesta';
          });
      }
    });
  }

  /* ============================================
     9. ANIMAZIONE CONTATORI (Stats Section)
     ============================================ */
  var statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length > 0) {
    function animateCounter(el, immediate) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var duration = 2500; // ms
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);

        el.textContent = current.toLocaleString('it-IT') + '+';

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          // Valore finale garantito
          el.textContent = target.toLocaleString('it-IT') + '+';
        }
      }

      if (immediate) {
        startTime = performance.now();
        requestAnimationFrame(step);
      } else {
        requestAnimationFrame(step);
      }
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target, true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: [0.1, 0.5] }
    );

    // Avvia animazione immediatamente per elementi già visibili
    statNumbers.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        animateCounter(el, true);
      } else {
        observer.observe(el);
      }
    });
  }

})();
