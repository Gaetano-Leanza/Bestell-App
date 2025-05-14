// Deklariert eine Variable namens cart, einem leeren Array um Werte oder Objekte aufzunehmen (die Artikel im Warenkorb).
let cart = [];

// JSON
let dishes = [
  {
    id: 1,
    name: "Pizza Margherita",
    price: 9.9,
    image: "../assets/img/food/margherita.png",
  },
  {
    id: 2,
    name: "Pizza Salami",
    price: 12.5,
    image: "../assets/img/food/salami.png",
  },
  {
    id: 3,
    name: "Pizza Funghi",
    price: 14.9,
    image: "../assets/img/food/funghi.png",
  },
  {
    id: 4,
    name: "Pizza Hawaii",
    price: 14.9,
    image: "../assets/img/food/hawaii.png",
  },
  {
    id: 5,
    name: "Pizza Quattro Formaggi",
    price: 11.9,
    image: "../assets/img/food/quattro formaggi.png",
  },
];

// Diese Funktion namens renderDishes() wird verwendet, um alle Gerichte (aus dem Array dishes) dynamisch im HTML anzuzeigen.
function renderDishes() {
  // Es wird eine Varialbe namens Container definiert, die im HTML nach dem Element mit der id="dish-container" sucht.
  let container = document.getElementById("dish-container");
  // Löscht zuerst alle Inhalte im Container, bevor neue Gerichte eingefügt werden.
  // Dadurch wird sichergestellt, dass der Inhalt nicht doppelt gerendert wird, falls renderDishes() mehrmals aufgerufen wird.
  container.innerHTML = "";
  // Iteriert durch jedes Objekt im dishes-Array (z. B. Pizza Margherita, Pizza Salami usw.).
  dishes.forEach((dish) => {
    // Für jedes Gericht wird eine Art „Karte“ (eine div) erstellt.
    let card = document.createElement("div");
    card.classList.add("dish-card");
    // Inhalt der Karte (Template) wird festgelegt.
    card.innerHTML = `
      <div class="dish-info">
        <h3>${dish.name}</h3>
        <p class="item">Preis: € ${dish.price.toFixed(2)}</p>
      </div>
      <div class="dish-image-wrapper">
        <img src="${dish.image}" alt="${dish.name}">
        <button class="add-button" onclick="addToCart(${dish.id})">+</button>
      </div>
    `;
    // Template (card) in den Container einfügen
    container.appendChild(card);
  });
}

// Diese Funktion wird aufgerufen, wenn man auf den „+“-Button bei einem Gericht klickt. Sie fügt das ausgewählte Gericht dem Warenkorb (cart) hinzu.
function addToCart(dishId) {
  // Gericht (Pizza) mit passender ID finden.
  // dishes ist das Array mit allen verfügbaren Gerichten (Pizzen).
  // .find() sucht das erste Gericht, dessen id mit dem übergebenen dishId übereinstimmt.
  // Das Ergebnis wird in der Variable dish gespeichert.
  let dish = dishes.find((d) => d.id === dishId);
  // Es wird geprüft, ob dieses Gericht bereits im Warenkorb (cart) enthalten ist.
  // Wenn ja, wird das vorhandene Objekt in der Variable cartItem gespeichert.
  // Wenn nicht, bleibt cartItem undefined.
  let cartItem = cart.find((item) => item.id === dishId);
  // Wenn das Gericht bereits im Warenkorb ist, dann wird die vorhandene Menge (quantity) einfach um 1 erhöht.
  if (cartItem) {
    cartItem.quantity++;
  }
  // Falls das Gericht noch nicht im Warenkorb ist, wird es dem cart hinzugefügt.
  // Dabei wird eine neue Eigenschaft quantity: 1 mitgegeben. ...dish kopiert alle Eigenschaften des Gerichts (id, name, price, image) in ein neues Objekt.
  else {
    cart.push({ ...dish, quantity: 1 });
  }
  // Gibt den aktuellen Inhalt des Warenkorbs im Browser-Entwicklertools-Fenster (Konsole) aus. (Praktisch zum Debuggen.)
  console.log(cart);
  // Warenkorb wird neu anzgezeigt.
  renderCart();
}

// Diese Funktion zeigt den aktuellen Inhalt des Warenkorbs (cart) an – sie wird aufgerufen, wenn ein Gericht (Pizza) mit addToCart() hinzugefügt wurde.
function renderCart() {
  // Die Funktion sucht das HTML-Element mit der Klasse .shopping-card und aktualisiert dessen Inhalt.
  let cartSection = document.querySelector(".shopping-card");
  // // Falls das Element nicht existiert: Abbruch
  if (!cartSection) return;
  // Der HTML-String wird je nach Zustand des Warenkorbs (cart) aufgebaut:
  let html = "<h2>Warenkorb</h2>";
  // Leerer Warenkorb: Zeigt einen Hinweis an.
  if (cart.length === 0) {
    html += `<p class="item">Dein Warenkorb ist leer.</p>`;
    // Befüllter Warenkorb: Listet alle Artikel auf (mithilfe der Template-Funktion buildCartItemHTML()).
  } else {
    // Hier wird die ausgelagerte Template-Funktion verwendet
    html += cart.map((item) => buildCartItemHTML(item)).join("");

    // Gesamtpreis berechnen und hinzufügen
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    html += `<p class="item2"><strong>Gesamt: € ${total.toFixed(
      2
    )}</strong></p>`;
  }
  // Generiertes HTML in die Seite einfügen
  cartSection.innerHTML = html;
}

// Diese Funktion generiert HTML-Code für das Warenkorb-Element.
// Diese Funktion nimmt ein item-Objekt entgegen.
function buildCartItemHTML(item) {
  // Erzeugt ein div-Container-Element für den Warenkorb-Artikel.
  return `
    <div class="cart-item">
      <p class="item">${item.name} – € ${(item.price * item.quantity).toFixed(
    2
  )}</p>
      <div class="cart-controls">
        <button class="remove-button-cart" onclick="decreaseQuantity(${
          item.id
        })">-</button>
        <div class="item-number">${item.quantity}</div>
        <button class="add-button-cart" onclick="increaseQuantity(${
          item.id
        })">+</button>
        <button class="trash-button" onclick="removeFromCart(${
          item.id
        })">🗑️</button>
      </div>
    </div>
  `;
}

// Diese Funktion wird aufgerufen, wenm man im Warenkorb auf den „+“-Button klickt.
// Sie verringert die Menge (quantity) eines Gerichts (Pizza).
function increaseQuantity(dishId) {
  // Diese Zeile sucht im cart (Warenkorb) nach dem Gericht, das die passende ID hat.
  // cart.find(...) durchsucht das Array und gibt das erste passende Element zurück.
  // Wenn z. B. dishId = 2 ist, wird { id: 2, name: "Pizza Salami", quantity: 1 } gefunden.
  let item = cart.find((d) => d.id === dishId);
  // if (item) prüft, ob das gesuchte Gericht überhaupt im Warenkorb enthalten ist.
  if (item) {
    // item.quantity++ erhöht die Menge um 1.
    item.quantity++;
    // Warenkorb wird neu anzgezeigt.
    renderCart();
  }
}

// Diese Funktion wird aufgerufen, wenm man im Warenkorb auf den „-“-Button klickt.
// Sie verringert die Menge (quantity) eines Gerichts (Pizza) oder entfernt es, wenn die Menge 0 erreicht.
function decreaseQuantity(dishId) {
  // Die Funktion sucht im cart-Array nach dem Gericht mit der passenden ID.
  // Wird dieses Gericht gefunden, wird es in der Variable item gespeichert.
  // Wenn es nicht im Warenkorb ist, bleibt item undefined.
  let item = cart.find((d) => d.id === dishId);
  // Wenn item existiert, wird seine Menge (quantity) um 1 reduziert.
  if (item) {
    item.quantity--;
    // Wenn nach dem Reduzieren die Menge 0 oder kleiner ist, wird das Gericht (Pizza) vollständig aus dem Warenkorb gelöscht.
    // Dafür wird einfach die Funktion removeFromCart(dishId) aufgerufen.
    if (item.quantity <= 0) {
      removeFromCart(dishId);
      // Falls die Menge noch über 0 liegt, wird der Warenkorb einfach aktualisiert (neu gerendert), um die geänderte Menge anzuzeigen.
    } else {
      renderCart();
    }
  }
}

// Diese Funktion entfernt ein bestimmtes Gericht (Pizza) vollständig aus dem Warenkorb anhand seiner dishId.
function removeFromCart(dishId) {
  // Das Array cart wird neu definiert, und zwar so, dass alle Gerichte (Pizzen) außer dem gewünschten entfernt werden.
  // filter() durchläuft alle Gerichte (Pizzen) im Warenkorb.
  // Es behält nur die, bei denen d.id !== dishId ist – also alle außer dem mit der gesuchten ID.
  //  Das Gericht mit der ID dishId wird somit gelöscht.
  cart = cart.filter((d) => d.id !== dishId);
  // Warenkorb wird neu anzgezeigt.
  renderCart();
}

// Wenn die Webseite vollständig geladen ist, wird automatisch die Funktion renderDishes() aufgerufen.
// So wird das Menü mit den Gerichten sofort beim Laden der Seite angezeigt.
document.addEventListener("DOMContentLoaded", () => {
  renderDishes();
  renderCart(); // Cart initialisieren
});

// Event-Listener für das Kontakt-Formular
// Überwacht das Absenden des Formulars mit der ID "contactForm"
// Wird ausgelöst, wenn man auf "Senden" klickt
document.getElementById("contactForm").addEventListener("submit", function (e) {
  // Formular nicht wirklich abschicken
  e.preventDefault();

  // Spinner anzeigen
  document.getElementById("spinner").style.display = "inline-block";

  // Nach kurzer Zeit weiterleiten
  setTimeout(function () {
    // Weiterleitung zur Bestätigungsseite
    window.location.href = "send_mail.html";
    // 1 Sekunde simuliertes "Senden"
  }, 1000);
});
