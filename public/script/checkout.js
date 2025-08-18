const orderSummary = document.getElementById("orderSummary"); // Order summary show karne ke liye UL element
const orderTotal = document.getElementById("orderTotal");     // Total price dikhane ke liye span/div
const checkoutForm = document.getElementById("checkoutForm"); // Checkout form

// LocalStorage se cart load karna
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

// Agar cart empty hai to ek message show karo
if (cart.length === 0) {
  orderSummary.innerHTML = `<li class="list-group-item">Your cart is empty.</li>`;
} else {
  // Agar cart me items hain to unko list me show karo
  cart.forEach(item => {
    total += item.price * item.quantity; // Total calculate karna
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${item.name} (x${item.quantity})
      <span>₹${(item.price * item.quantity).toFixed(2)}</span>
    `;
    orderSummary.appendChild(li); // Har product ko list me add karo
  });
}

// Order ka total 
orderTotal.textContent = total.toFixed(2);








// ------------------ FORM SUBMIT LOGIC ------------------

checkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Form submit hone par page refresh ko rokna

  // Form + cart se order ka data ready karna
  const orderData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    payment: document.getElementById("payment").value,
    items: cart,   // Cart ke items backend ko bhejna
    total: total   // Cart ka total
  };

  try {
    // Backend pe POST request bhejna (order save karne ke liye)
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // JSON format me data bhejna
      body: JSON.stringify(orderData) // Object ko JSON string me convert karke bhejna
    });

    const data = await res.json();

    // Agar backend se success aaya
    if (res.ok) {
      alert("✅ Order placed successfully!");
      localStorage.removeItem("cart"); // Cart clear kar do
      window.location.href = "index.html"; // Homepage par redirect kar do
    } else {
      // Agar backend ne error diya
      alert("❌ Failed to place order: " + data.message);
    }
  } catch (error) {
    // Agar fetch request fail ho gayi (jaise server down ho)
    console.error("Error placing order:", error);
    alert("Something went wrong.");
  }
});
