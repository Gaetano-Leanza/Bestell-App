let cart = [];
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
    price: 18.9,
    image: "../assets/img/food/funghi.png",
  },
  {
    id: 4,
    name: "Pizza Hawaii",
    price: 8.5,
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
  // Gericht (Pizza) zum Warenkorb hinzufügen.
  // Das gefundene Gericht (Pizza) wird an das Ende des Arrays cart angehängt.
  cart.push(dish);
  // Gibt den aktuellen Inhalt des Warenkorbs im Browser-Entwicklertools-Fenster (Konsole) aus. (Praktisch zum Debuggen.)
  console.log(cart);
  // Warenkorb neu anzeigen.
  renderCart();
}

// Diese Funktion zeigt den aktuellen Inhalt des Warenkorbs (cart) an – sie wird aufgerufen, wenn ein Gericht (Pizza) mit addToCart() hinzugefügt wurde.
function renderCart() {
  // Sucht im HTML nach dem Element mit der Klasse shopping-card.
  // Dort wird später der Warenkorb-Inhalt eingefügt.
  let cartSection = document.querySelector(".shopping-card");
  // Löscht vorherige Inhalte in diesem Bereich. Fügt eine Überschrift „Warenkorb“ ein.
  // So bleibt die Anzeige beim Neuladen oder Hinzufügen aktuell und übersichtlich.
  cartSection.innerHTML = "<h2>Warenkorb</h2>";
  // Für jedes Element (item) im Array cart wird ein neues HTML-Element erstellt.
  cart.forEach((item) => {
    // HTML-Element für das einzelne Gericht im Warenkorb erstellen.
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    // Inhalt des Warenkorb-Eintrags setzen. Zeigt den Namen des Gerichts (Pizza) und den Preis an.
    // toFixed(2) sorgt für zwei Nachkommastellen, z. B. „€ 7.90“.
    cartItem.innerHTML = ` 
    <p class="item">${item.name} – € ${item.price.toFixed(2)}</p>
    `;
    // Element zum Warenkorb-Container hinzufügen.
    cartSection.appendChild(cartItem);
  });
}

// Wenn die Webseite vollständig geladen ist, wird automatisch die Funktion renderDishes() aufgerufen.
// So wird das Menü mit den Gerichten sofort beim Laden der Seite angezeigt.
document.addEventListener("DOMContentLoaded", renderDishes);
