document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Formular nicht wirklich abschicken

  // Spinner anzeigen
  document.getElementById("spinner").style.display = "inline-block";

  // Nach kurzer Zeit weiterleiten
  setTimeout(function () {
    window.location.href = "send_mail.html"; // Weiterleitung zur Bestätigungsseite
  }, 1000); // 1 Sekunde simuliertes "Senden"
});
