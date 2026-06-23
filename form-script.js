/* ============================================================
   FORM VALUTAZIONE CONTENTTEZZA — LOGICA JAVASCRIPT
   - 9 domande di valutazione con scala 1-10 ciascuna
   - Validazione: tutti i campi obbligatori, 100 char min recensione,
     checkbox consenso obbligatoria se si vuole pubblicare
   - Invio risultati via EmailJS (configurare i 3 ID prima della pubblicazione)
   ============================================================ */

(function () {
  'use strict';

  // ==================== COSTANTI ====================
  const MIN_CHARS   = 100;   // Caratteri minimi per la recensione
  const MAX_CHARS   = 1000;  // Caratteri massimi (maxlength HTML)

  /**
   * Le 9 domande specifiche per un'impresa di pulizie.
   * Ogni domanda genera un gruppo separato di radio button (nome unico).
   */
  const RATING_QUESTIONS = [
    {
      id: 'safety',
      text: "Gli addetti sono formati, addestrati e muniti di dispositivi di protezione individuale (scarpe antinfortunistiche e guanti)?"
    },
    {
      id: 'punctuality',
      text: 'Puntualità e rispetto degli orari concordati'
    },
    {
      id: 'professionalism',
      text: 'Professionalità e cortesia del personale'
    },
    {
      id: 'attention',
      text: 'Attenzione ai dettagli e cura nelle operazioni'
    },
    {
      id: 'equipment',
      text: 'Efficienza nell\'utilizzo di prodotti e attrezzature'
    },
    {
      id: 'communication',
      text: "Disponibilità e chiarezza nella comunicazione (preventivi, risoluzione problemi, efficienza nell'organizzare lavori extra, ecc.)"
    },
    {
      id: 'collaboration',
      text: "L'impresa/il personale collabora attivamente per segnalare guasti notati all'interno dell'azienda, mancanza di materiale sanitario, servizi che si consiglia eseguire per mantenere/alzare il livello di pulizia?"
    },
    {
      id: 'overall',
      text: 'Come valuti complessivamente il nostro servizio?'
    },
    {
      id: 'recommend',
      text: 'Probabilità di raccomandare i nostri servizi ad altri'
    }
  ];

  // ==================== ELEMENTI DOM ====================
  const form            = document.getElementById('surveyForm');
  var ratingLegend      = document.getElementById('ratingLegend');
  var ratingQuestions   = document.getElementById('ratingQuestions');
  var reviewText        = document.getElementById('reviewText');
  var charCount         = document.getElementById('charCount');
  var consentCheckbox   = document.getElementById('consentCheckbox');
  var ratingError       = document.getElementById('ratingError');
  var reviewError       = document.getElementById('reviewError');
  var consentError      = document.getElementById('consentError');
  var successMessage    = document.getElementById('successMessage');
  var generalError      = document.getElementById('generalError');

  // ==================== GENERAZIONE LEGENDA VALUTAZIONI ====================
  /**
   * Crea la legenda con i badge colorati prima delle domande.
   * Rosso: 1-4 (Insufficienza grave) | Arancione: 5-6 (Insufficienza)
   * Giallo: 7-8 (Sufficienza) | Verde: 9-10 (Ottimo)
   */
  function buildLegend() {
    var legendData = [
      { range: '1–4', label: 'Insufficienza grave', badgeClass: 'badge-red' },
      { range: '5–6', label: 'Insufficienza', badgeClass: 'badge-orange' },
      { range: '7–8', label: 'Sufficienza', badgeClass: 'badge-yellow' },
      { range: '9–10', label: 'Ottimo', badgeClass: 'badge-green' }
    ];

    legendData.forEach(function (item) {
      var legendItem = document.createElement('div');
      legendItem.className = 'legend-item';

      var badge = document.createElement('span');
      badge.className = 'legend-badge ' + item.badgeClass;
      badge.textContent = item.range;

      var text = document.createTextNode(item.label);

      legendItem.appendChild(badge);
      legendItem.appendChild(text);
      ratingLegend.appendChild(legendItem);
    });
  }

  // ==================== GENERAZIONE DOMANDE RATING (9 domande × 1-10) ====================
  /**
   * Per ogni domanda crea un blocco con 10 pulsanti radio da 1 a 10.
   * Ogni gruppo ha un nome unico per evitare conflitti tra i radio button.
   */
  function buildRatingQuestions() {
    RATING_QUESTIONS.forEach(function (question, index) {
      // Crea il contenitore della domanda
      var questionBlock = document.createElement('div');
      questionBlock.className = 'rating-question';
      questionBlock.dataset.questionId = question.id;

      // Titolo della domanda con numero (separato per corretto wrapping)
      var titleWrapper = document.createElement('div');
      titleWrapper.className = 'rating-question-title';

      var numberSpan = document.createElement('span');
      numberSpan.className = 'rating-question-number';
      numberSpan.textContent = index + 1;

      var textSpan = document.createElement('span');
      textSpan.className = 'rating-question-text';
      textSpan.textContent = question.text;

      titleWrapper.appendChild(numberSpan);
      titleWrapper.appendChild(textSpan);
      questionBlock.appendChild(titleWrapper);

      // Contenitore dei pulsanti radio per questa domanda
      var ratingContainer = document.createElement('div');
      ratingContainer.className = 'rating-container';
      ratingContainer.setAttribute('role', 'radiogroup');
      ratingContainer.setAttribute('aria-label', question.text + ' — Valutazione da 1 a 10');

      // Genera i pulsanti da 1 a 10
      for (var i = 1; i <= 10; i++) {
        var radio = document.createElement('input');
        radio.type       = 'radio';
        radio.name       = 'rating_' + question.id;
        radio.id         = 'rating_' + question.id + '_' + i;
        radio.value      = i;
        radio.required   = true;

        var label = document.createElement('label');
        label.htmlFor  = 'rating_' + question.id + '_' + i;
        label.textContent = i;
        label.dataset.value = i;

        ratingContainer.appendChild(radio);
        ratingContainer.appendChild(label);
      }

      questionBlock.appendChild(ratingContainer);
      ratingQuestions.appendChild(questionBlock);
    });
  }

  // ==================== CONTEGGIO CARATTERI ====================
  /**
   * Aggiorna il contatore caratteri in tempo reale.
   * Mostra stato valido/invalido con colori diversi.
   */
  function updateCharCounter() {
    var len = reviewText.value.length;
    charCount.textContent = len;

    // Rimuovi classi temporanee
    charCount.parentElement.classList.remove('valid', 'invalid');

    if (len === 0) return; // Nessuna indicazione se vuoto

    if (len >= MIN_CHARS) {
      charCount.parentElement.classList.add('valid');
    } else {
      charCount.parentElement.classList.add('invalid');
    }
  }

  // ==================== VALIDAZIONE CAMPI ====================
  /**
   * Restituisce un oggetto con lo stato di validità di ogni campo.
   */
  function validateForm() {
    var isValid = true;

    // --- 1. Valutazione (tutte le 9 domande) ---
    var unansweredCount = 0;
    RATING_QUESTIONS.forEach(function (question) {
      var selected = form.querySelector('input[name="rating_' + question.id + '"]:checked');
      if (!selected) {
        unansweredCount++;
        // Evidenzia il blocco della domanda con errore
        var block = document.querySelector('.rating-question[data-question-id="' + question.id + '"]');
        if (block) block.classList.add('error-state');
      } else {
        var block = document.querySelector('.rating-question[data-question-id="' + question.id + '"]');
        if (block) block.classList.remove('error-state');
      }
    });

    if (unansweredCount > 0) {
      ratingError.hidden = false;
      ratingError.textContent = 'Devi rispondere a tutte le domande. (' + unansweredCount + ' risposta' + (unansweredCount > 1 ? 'e' : '') + ' mancante' + (unansweredCount > 1 ? 'i' : '') + ')';
      isValid = false;
    } else {
      ratingError.hidden = true;
      // Rimuovi stati di errore da tutti i blocchi
      document.querySelectorAll('.rating-question.error-state').forEach(function (block) {
        block.classList.remove('error-state');
      });
    }

    // --- 2. Recensione (textarea) ---
    var reviewLen = reviewText.value.trim().length;
    if (reviewLen < MIN_CHARS) {
      reviewError.hidden = false;
      isValid = false;
    } else {
      reviewError.hidden = true;
    }

    // --- 3. Consenso GDPR ---
    // Se l'utente vuole inviare la recensione, deve acconsentire alla pubblicazione.
    if (reviewLen >= MIN_CHARS && !consentCheckbox.checked) {
      consentError.hidden = false;
      isValid = false;
    } else {
      consentError.hidden = true;
    }

    // --- 4. Dati Azienda (obbligatori) ---
    var clientName   = document.getElementById('clientName').value.trim();
    var clientEmail  = document.getElementById('clientEmail').value.trim();

    if (!clientName) {
      isValid = false;
      highlightInputError('clientName');
    } else {
      clearInputError('clientName');
    }

    if (!isValidEmail(clientEmail)) {
      isValid = false;
      highlightInputError('clientEmail');
    } else {
      clearInputError('clientEmail');
    }

    return isValid;
  }

  /**
   * Verifica che un valore sia un indirizzo email valido (regex base).
   */
  function isValidEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Evidenzia con bordo rosso un input che ha errore.
   */
  function highlightInputError(inputId) {
    var input = document.getElementById(inputId);
    if (input) {
      input.style.borderColor = '#dc2626';
      input.addEventListener('input', function handler() {
        clearInputError(inputId);
        input.removeEventListener('input', handler);
      });
    }
  }

  /**
   * Rimuove l'evidenziazione di errore da un input.
   */
  function clearInputError(inputId) {
    var input = document.getElementById(inputId);
    if (input) {
      input.style.borderColor = '';
    }
  }

  // ==================== RACCOLTA DATI DEL FORM ====================
  /**
   * Restituisce un oggetto con tutti i dati del form, pronto per l'invio.
   */
  function getFormData() {
    var scores = {};
    var totalScore = 0;

    // Raccoglie il punteggio di tutte le 9 domande
    RATING_QUESTIONS.forEach(function (question) {
      var selected = form.querySelector('input[name="rating_' + question.id + '"]:checked');
      var score = selected ? parseInt(selected.value, 10) : null;
      scores[question.id] = score;
      if (score !== null) totalScore += score;
    });

    var reviewLen   = reviewText.value.trim().length;
    var avgScore    = RATING_QUESTIONS.length > 0 ? Math.round((totalScore / RATING_QUESTIONS.length) * 10) / 10 : 0;

    return {
      clientName: document.getElementById('clientName').value.trim(),
      clientEmail: document.getElementById('clientEmail').value.trim(),
      scores: scores,           // Punteggio per ogni domanda singola
      averageScore: avgScore,   // Media ponderata su tutte le domande
      totalScore: totalScore,   // Somma totale (max 90)
      review: reviewText.value.trim(),
      consentToPublish: consentCheckbox.checked,
      canBePublished: consentCheckbox.checked && reviewLen >= MIN_CHARS,
      submittedAt: new Date().toISOString()
    };
  }

  // ==================== CALCOLO TOTALE PUNTI IN TEMPO REALE ====================
  /**
   * Calcola la somma di tutti i punteggi selezionati e aggiorna il campo hidden.
   */
  function calculateTotalScore() {
    var total = 0;
    RATING_QUESTIONS.forEach(function (question) {
      var selected = form.querySelector('input[name="rating_' + question.id + '"]:checked');
      if (selected) {
        total += parseInt(selected.value, 10);
      }
    });

    // Aggiorna il campo hidden del form
    document.getElementById('totalScoreHidden').value = total;

    return total;
  }

  // ==================== INIZIALIZZAZIONE ====================
  buildLegend();
  buildRatingQuestions();

  // Event listener per il contatore caratteri
  reviewText.addEventListener('input', updateCharCounter);

  // Rimuovi errori in tempo reale quando l'utente interagisce con i rating
  form.querySelectorAll('.rating-container input[type="radio"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var questionBlock = this.closest('.rating-question');
      if (questionBlock) {
        questionBlock.classList.remove('error-state');
        questionBlock.classList.add('has-answer');
      }
      ratingError.hidden = true;

      // Ricalcola il totale ogni volta che viene selezionato un punteggio
      calculateTotalScore();
    });
  });

  // Segna visivamente le domande già compilate e calcola il totale iniziale
  form.querySelectorAll('.rating-container input[type="radio"]:checked').forEach(function (radio) {
    var questionBlock = radio.closest('.rating-question');
    if (questionBlock) questionBlock.classList.add('has-answer');
  });

  // Calcola il totale anche per le risposte già selezionate al caricamento
  calculateTotalScore();

  reviewText.addEventListener('input', function () {
    if (reviewText.value.trim().length >= MIN_CHARS) {
      reviewError.hidden = true;
    }
  });

  consentCheckbox.addEventListener('change', function () {
    var reviewLen = reviewText.value.trim().length;
    if (consentCheckbox.checked || reviewLen < MIN_CHARS) {
      consentError.hidden = true;
    }
  });

  // ==================== SUBMIT DEL FORM ====================
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Nascondi messaggi precedenti
    successMessage.hidden = true;
    generalError.hidden   = true;

    // Validazione rigorosa
    if (!validateForm()) {
      // Scroll al primo errore
      var firstError = form.querySelector('.error-msg:not([hidden])');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Raccogli i dati
    var data = getFormData();
    console.log('📋 Dati del form pronti per l\'invio:', data);

    // Disabilita il bottone durante l'invio
    var submitBtn = form.querySelector('.btn-submit');
    submitBtn.disabled   = true;
    submitBtn.textContent = 'Invio in corso...';

    // ============================================================
    // 📧 INVIO VIA EMAILJS
    // ⚠️ Prima di pubblicare, sostituire i 3 placeholder qui sotto:
    //    LA_TUA_PUBLIC_KEY      → dalla Dashboard EmailJS → Account
    //    IL_TUO_SERVICE_ID      → dalla Dashboard EmailJS → Email Services
    //    IL_TUO_TEMPLATE_ID     → dalla Dashboard EmailJS → Email Templates
    // ============================================================

    (function () {
      emailjs.init("ohQ2pBkRhgzxfiY02");

      var scoresSummary = RATING_QUESTIONS.map(function (q) {
        return q.text + ': ' + (data.scores[q.id] || '-') + '/10';
      }).join(' | ');

      emailjs.send("service_21ve4rd", "template_x2m5bbf", {
        company_name: data.clientName,
        company_email: data.clientEmail,
        average_score: data.averageScore,
        total_score: data.totalScore,
        scores_detail: scoresSummary,
        review: data.review,
        consent: data.consentToPublish ? 'Acconsentito' : 'Non acconsentito',
        published: data.canBePublished ? 'Pubblicabile' : 'Solo uso interno',
        date: data.submittedAt
      })
        .then(function () {
          console.log('✅ Email inviata con successo!');
          form.reset();
          updateCharCounter();
          document.querySelectorAll('.rating-question.has-answer').forEach(function (b) { b.classList.remove('has-answer'); });
          successMessage.hidden = false;
        }, function (err) {
          console.error('❌ Errore invio email:', err);
          generalError.hidden = false;
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Invia Valutazione';
        });
    })();

    // ============================================================
    // 📧 FINE — LOGICA DI INVIO VIA EMAILJS
    // ============================================================
  });

})(); // Fine IIFE

/* ============================================================
   📌 NOTA IMPORTANTE — CONFIGURAZIONE EMAILJS DA COMPLETARE
   ============================================================

   Prima di pubblicare la pagina, devi sostituire 3 valori:

   1️⃣ In index.html (nel <head>):
        emailjs.init("LA_TUA_PUBLIC_KEY")
      → Sostituisci con la tua Public Key da EmailJS Dashboard

   2️⃣ In script.js (nella funzione submit):
        emailjs.send("IL_TUO_SERVICE_ID", "IL_TUO_TEMPLATE_ID", { ... })
      → Sostituisci SERVICE ID e TEMPLATE ID presi dalla dashboard

   Il form contiene un campo nascosto che calcola in tempo reale
   il totale dei punti. Viene inviato automaticamente con EmailJS.

   Il report email conterrà:
     - Nome Azienda + Email
     - Punteggio medio (es. 7.4/10) e totale (es. 67/90)
     - Dettaglio delle 9 domande
     - Recensione testuale
     - Consenso alla pubblicazione
   ============================================================ */