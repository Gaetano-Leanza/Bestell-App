document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Formular nicht wirklich abschicken

  // Spinner anzeigen
  document.getElementById("spinner").style.display = "inline-block";

  // Nach kurzer Zeit weiterleiten
  setTimeout(function () {
    window.location.href = "send_mail.html"; // Weiterleitung zur Bestätigungsseite
  }, 1000); // 1 Sekunde simuliertes "Senden"
});

// Wenn die Webseite vollständig geladen ist, wird automatisch die Funktion renderDishes() aufgerufen.
// So wird das Menü mit den Gerichten sofort beim Laden der Seite angezeigt.
document.addEventListener("DOMContentLoaded", renderDishes);
