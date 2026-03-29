let cart = [];

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    });
  }

  updateCart();
}

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart">Your cart is empty.</p>';
    cartTotal.textContent = "Total: $0.00";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <div class="cart-item-top">
        <span>${item.name}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      <div class="cart-item-bottom">
        <span>Price: $${item.price.toFixed(2)} | Qty: ${item.quantity}</span>
        <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function clearCart() {
  cart = [];
  updateCart();
}

let currentSlide = 0;
const slides = document.getElementById("slides");
const totalSlides = slides.children.length;

function showSlide(index) {
  if (index < 0) {
    currentSlide = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }

  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

setInterval(() => {
  nextSlide();
}, 3000);
