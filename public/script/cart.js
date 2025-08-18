const cartItemsContainer = document.getElementById("cartItems"); // Cart items ko show karne ka container
const cartTotalElement = document.getElementById("cart-total"); // Total price show karne wala element

function renderCart() {
  // LocalStorage se cart data lena (agar nahi mila to empty array)
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = ""; // Purane items clear kar do

  // Agar cart empty hai to ek message show karo
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="text-center text-muted">
        <h4>🛒 Your cart is empty!</h4>
        <p>Looks like you haven't added anything yet.</p>
        <a href="product.html" class="btn btn-dark mt-3">Explore Products</a>
      </div>
    `;
    cartTotalElement.textContent = "0"; // Initially  Total = 0
    return;
  }

  let total = 0; 

  // Har item ke liye card create karna
  cart.forEach((item, index) => {
    total += item.price * item.quantity; // Item price × quantity add karna

    const cartCard = document.createElement("div");
    cartCard.classList.add("col-12");

    // Har item ka UI card
    cartCard.innerHTML = `
      <div class="card shadow-sm p-3 mb-3">
        <div class="row g-3 align-items-center">
          <div class="col-md-2">
            <img src="${item.image}" class="img-fluid rounded" alt="${item.name}">
          </div>
          <div class="col-md-6">
            <h5>${item.name}</h5>
            <p class="mb-1 text-muted small">${item.category}</p>
            <p class="mb-1">${item.description}</p>

            <!-- Quantity Controls -->
            <div class="d-flex align-items-center gap-2 mt-2">
              <button class="btn btn-outline-secondary btn-sm minus-btn" data-index="${index}">−</button>
              <span class="fw-bold">${item.quantity}</span>
              <button class="btn btn-outline-secondary btn-sm plus-btn" data-index="${index}">+</button>
            </div>
          </div> 
          <div class="col-md-2 text-success fw-bold">
            ₹${(item.price * item.quantity).toFixed(2)}
          </div>
          <div class="col-md-2 text-end">
            <button class="btn btn-sm btn-danger remove-btn" data-index="${index}">
              Remove
            </button>
          </div>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(cartCard);
  });

  // Total price update karna
  cartTotalElement.textContent = total.toFixed(2);

  // 🗑 Remove button logic
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(this.dataset.index, 1); // Item remove karo
      localStorage.setItem("cart", JSON.stringify(cart)); // LocalStorage update karo
      renderCart(); // Cart dobara render karo
    });
  });

  // ➕ Plus button logic (quantity increase)
  document.querySelectorAll(".plus-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let index = this.dataset.index;
      if (cart[index].quantity < cart[index].stock) { // Stock limit check
        cart[index].quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    });
  });

  // ➖ Minus button logic (quantity decrease)
  document.querySelectorAll(".minus-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let index = this.dataset.index;
      if (cart[index].quantity > 1) { // Quantity 1 se kam nahi honi chahiye
        cart[index].quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    });
  });
}

// Page load hote hi cart render karo
renderCart();
