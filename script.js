// Login
function login() {
  const mobile = document.getElementById("mobile").value;
  const password = document.getElementById("password").value;

  if (mobile === "9999999999" && password === "admin") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "home.html";
  } else {
    alert("Invalid Mobile Number or Password!");
  }
}

// Logout
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// Show/Hide Menu
function toggleMenu() {
  document.getElementById("menu").classList.toggle("hidden");
}

// Products
const productsData = {
  tablets: [
    { name: "Paracetamol", price: 30, img: "images/tablets/paracetamol.jpg" },
    { name: "Dolo 650", price: 35, img: "images/tablets/dolo650.jpg" }
  ],
  syrups: [
    { name: "Cough Syrup", price: 60, img: "images/syrups/cough.jpg" }
  ],
  ointments: [
    { name: "Burnol", price: 40, img: "images/ointments/burnol.jpg" }
  ],
  injections: [
    { name: "Insulin", price: 150, img: "images/injections/insulin.jpg" }
  ]
};

// Display products by category
function showProducts(category) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  productsData[category].forEach((p, index) => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart('${category}', ${index})">Add to Cart</button>
      </div>
    `;
  });
}

// Add to Cart
function addToCart(category, index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = productsData[category][index];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").innerText = cart.length;
}

// Show Sections
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active-section"));
  document.getElementById(id).classList.add("active-section");

  if (id === "cart") displayCart();
  if (id === "orders") displayOrders();
}

// Display Cart
function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartItems");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item, i) => {
    container.innerHTML += `
      <div class="product">
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="removeFromCart(${i})">Remove</button>
      </div>
    `;
  });
}

// Remove item from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Place order
function placeOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(...cart);
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");
  alert("Order placed successfully!");
  showSection("orders");
  updateCartCount();
}

// Display orders
function displayOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const container = document.getElementById("orderItems");
  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  orders.forEach(item => {
    container.innerHTML += `
      <div class="product">
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <p>Status: ✅ Delivered</p>
      </div>
    `;
  });
}

// Search product by name
function searchProduct() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  const allProducts = Object.values(productsData).flat();
  const results = allProducts.filter(p => p.name.toLowerCase().includes(query));
  const container = document.getElementById("products");
  container.innerHTML = "";

  results.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button>Add to Cart</button>
      </div>
    `;
  });
}

// Initialize
window.onload = () => {
  if (localStorage.getItem("loggedIn") !== "true" && location.pathname.includes("home.html")) {
    window.location.href = "index.html";
  }
  if (document.getElementById("cartCount")) updateCartCount();
};
