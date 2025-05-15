let cart = [];

const dishes = {
  pizzas: [
    {
      id: 1,
      name: "Pizza Margherita",
      price: 9.9,
      image: "../assets/img/food/margherita.jpg",
    },
    {
      id: 2,
      name: "Pizza Salami",
      price: 12.5,
      image: "../assets/img/food/salami.jpg",
    },
    {
      id: 3,
      name: "Pizza Funghi",
      price: 14.9,
      image: "../assets/img/food/funghi.jpg",
    },
    {
      id: 4,
      name: "Pizza Hawaii",
      price: 14.9,
      image: "../assets/img/food/hawaii.jpg",
    },
    {
      id: 5,
      name: "Pizza Quattro Formaggi",
      price: 11.9,
      image: "../assets/img/food/Quattro Formaggi.jpg",
    },
  ],
  salads: [
    {
      id: 6,
      name: "Caesar Salad",
      price: 7.9,
      image: "../assets/img/food/caesar.jpg",
    },
    {
      id: 7,
      name: "Griechischer Salat",
      price: 8.5,
      image: "../assets/img/food/greek.jpg",
    },
    {
      id: 8,
      name: "Bunter Salat",
      price: 6.9,
      image: "../assets/img/food/mixed.jpg",
    },
    {
      id: 9,
      name: "Thunfischsalat",
      price: 8.9,
      image: "../assets/img/food/tuna.jpg",
    },
    {
      id: 10,
      name: "Mozzarella-Tomate",
      price: 7.5,
      image: "../assets/img/food/mozzarella.jpg",
    },
  ],
  drinks: [
    {
      id: 11,
      name: "Cola 0,5l",
      price: 2.5,
      image: "../assets/img/food/cola.jpg",
    },
    {
      id: 12,
      name: "Wasser 0,5l",
      price: 1.9,
      image: "../assets/img/food/water.jpg",
    },
    {
      id: 13,
      name: "Apfelschorle 0,5l",
      price: 2.2,
      image: "../assets/img/food/apfelschorle.jpg",
    },
    {
      id: 14,
      name: "Fanta 0,5l",
      price: 2.5,
      image: "../assets/img/food/fanta.jpg",
    },
    {
      id: 15,
      name: "Sprite 0,5l",
      price: 2.5,
      image: "../assets/img/food/sprite.jpg",
    },
  ],
};

function renderDishes() {
  ["pizzas", "salads", "drinks"].forEach(renderSection);
}

function renderSection(section) {
  const container = document.getElementById(section);
  if (!container) return;

  container.innerHTML = "";
  dishes[section].forEach((dish) => {
    const card = document.createElement("div");
    card.classList.add("dish-card");
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
    container.appendChild(card);
  });
}

function addToCart(dishId) {
  const allDishes = [...dishes.pizzas, ...dishes.salads, ...dishes.drinks];
  const dish = allDishes.find((d) => d.id === dishId);
  if (!dish) return;

  const cartItem = cart.find((item) => item.id === dishId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...dish, quantity: 1 });
  }
  renderCart();
}

function renderCart() {
  const cartSection = document.querySelector(".shopping-card");
  const cartItemsContainer = document.getElementById("cart-items-container");
  if (!cartSection || !cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="item cart-empty-message">Dein Warenkorb ist leer.</p>`;
    return;
  }

  const cartHTML = buildCartItemsHTML(cart);
  cartItemsContainer.innerHTML = cartHTML;
}

function buildCartItemsHTML(cart) {
  let subtotal = 0;
  let html = "";

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    html += buildCartItemHTML(item);
  });

  html += buildCartSummaryHTML(subtotal);
  return html;
}

function buildCartSummaryHTML(subtotal) {
  const lieferkosten = 2.9;
  const gesamtsumme = subtotal + lieferkosten;
  return `
  <div class="cart-summary">
    <hr>
    <p class="item summary-line">Zwischensumme: € ${subtotal.toFixed(2)}</p>
    <p class="item summary-line">Lieferkosten: € ${lieferkosten.toFixed(2)}</p>
    <p class="item summary-total">
      <strong>Gesamtsumme: € ${gesamtsumme.toFixed(2)}</strong>
    </p>
    <button class="order-button">Bestellen</button>
  </div>
`;
}

function buildCartItemHTML(item) {
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

function increaseQuantity(dishId) {
  const item = cart.find((d) => d.id === dishId);
  if (item) {
    item.quantity++;
    renderCart();
  }
}

function decreaseQuantity(dishId) {
  const item = cart.find((d) => d.id === dishId);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      removeFromCart(dishId);
    } else {
      renderCart();
    }
  }
}

function removeFromCart(dishId) {
  cart = cart.filter((d) => d.id !== dishId);
  renderCart();
}

function placeOrder() {
  const confirmation = document.createElement("div");
  confirmation.className = "order-confirmation";
  confirmation.innerHTML = `
    <h7>Vielen Dank für Ihre Bestellung!</h7>
    <p class="item">Ihr Warenkorb wurde geleert.</p>
  `;
  document.body.appendChild(confirmation);
  confirmation.style.display = "block";

  cart = [];
  renderCart();

  setTimeout(() => {
    confirmation.style.animation = "slideOut 0.3s ease-in";
    setTimeout(() => confirmation.remove(), 300);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderDishes();
  renderCart();
});

const cartToggle = document.querySelector(".cart-toggle-button");
if (cartToggle) {
  cartToggle.addEventListener("click", () => {
    const cartElement = document.querySelector(".shopping-card");
    if (!cartElement) return;
    const isActive = cartElement.classList.toggle("active");
    if (window.innerWidth > 900) {
      cartElement.classList.toggle("overlay");
    }
    cartToggle.textContent = isActive ? "Warenkorb schließen" : "Warenkorb";
  });
}

document.addEventListener("click", function (e) {
  const cartOverlay = document.querySelector(".shopping-card.overlay");
  if (
    cartOverlay &&
    !cartOverlay.contains(e.target) &&
    !e.target.classList.contains("cart-toggle-button")
  ) {
    cartOverlay.classList.remove("overlay");
  }
});

document
  .querySelector(".shopping-card")
  ?.addEventListener("click", function (e) {
    if (e.target.classList.contains("order-button")) {
      placeOrder();
    }
  });

const style = document.createElement("style");
style.textContent = `
  @keyframes slideOut {
    from { opacity: 1; transform: translate(-50%, -50%); }
    to { opacity: 0; transform: translate(-50%, -40%); }
  }
`;
document.head.appendChild(style);

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    document
      .getElementById("spinner")
      ?.style?.setProperty("display", "inline-block");
    setTimeout(() => {
      window.location.href = "send_mail.html";
    }, 1000);
  });
}
