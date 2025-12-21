document.addEventListener("DOMContentLoaded", () => {
  const TAX_RATE = 0.05;
  const FEE_ASAP = 10;
  const FEE_SCHEDULE = 5;

  const cartContainer = document.querySelector(".cart-items-container");
  const payValues = document.querySelectorAll(".pay-value");
  const ctaButton = document.querySelector(".cta-button");
  const backBtn = document.querySelector(".back-btn");

  let currentFee = FEE_ASAP;
  let cartItems = [];
  const userEmail = localStorage.getItem("gmail");

  if (!userEmail) {
    alert("Please log in to view your cart.");
    window.location.href = "login.html";
    return;
  }

  loadCart();

  async function loadCart() {
    try {
      const res = await fetch(
        "https://rwd.up.railway.app/auth/returncart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: userEmail })
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        cartItems = data.items;
        renderCartItems();
        updateTotals();
      } else {
        cartItems = [];
        renderCartItems();
        updateTotals();
      }
    } catch (err) {
      console.error(err);
      cartContainer.innerHTML =
        `<div style="padding:20px;color:red;">Error loading cart</div>`;
    }
  }

  function increaseQtyLocal(item) {
    item.quantity += 1;
    renderCartItems();
    updateTotals();
  }

  function decreaseQtyLocal(item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cartItems = cartItems.filter(i => i._id !== item._id);
    }
    renderCartItems();
    updateTotals();
  }

  function deleteItemLocal(item) {
    cartItems = cartItems.filter(i => i._id !== item._id);
    renderCartItems();
    updateTotals();
  }

  function renderCartItems() {
    if (cartItems.length === 0) {
      cartContainer.innerHTML =
        `<div style="padding:50px;color:#888;text-align:center;">Your cart is empty</div>`;
      ctaButton.disabled = true;
      return;
    }

    ctaButton.disabled = false;
    cartContainer.innerHTML = "";

    cartItems.forEach(item => {
      cartContainer.innerHTML += `
        <div class="cart-card" data-id="${item._id}">
          <div class="card-content">
            <img src="${item.itemsrc}" class="item-img">
            <div class="item-details">
              <h3>${item.itemname}</h3>
              <div class="price">₹${item.itemprice}</div>
            </div>
          </div>
          <div class="card-actions">
            <button class="qty-btn is-minus">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn is-plus">+</button>
            <button class="delete-btn">🗑</button>
          </div>
        </div>
      `;
    });
  }

  function updateTotals() {
    const itemTotal = cartItems.reduce(
      (sum, i) => sum + i.itemprice * i.quantity,
      0
    );
    const tax = Math.round(itemTotal * TAX_RATE);
    const grandTotal = itemTotal + tax + currentFee;

    payValues[0].innerText = `₹${itemTotal}`;
    payValues[1].innerText = `₹${currentFee}`;
    payValues[2].innerText = `₹${tax}`;
    payValues[3].innerText = `₹${grandTotal}`;
    ctaButton.innerText = `Pay & Order • ₹${grandTotal}`;
  }

  cartContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".cart-card");
    if (!card) return;

    const item = cartItems.find(i => i._id === card.dataset.id);
    if (!item) return;

    if (e.target.classList.contains("is-plus")) {
      increaseQtyLocal(item);
      increaseQtyAPI(item);
    }

    if (e.target.classList.contains("is-minus")) {
      decreaseQtyLocal(item);
      decreaseQtyAPI(item);
    }

    if (e.target.classList.contains("delete-btn")) {
      deleteItemLocal(item);
      deleteItemAPI(item);
    }
  });

  function increaseQtyAPI(item) {
    fetch("https://rwd.up.railway.app/auth/add2cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userEmail,
        itemname: item.itemname,
        itemprice: item.itemprice,
        itemsrc: item.itemsrc
      })
    }).catch(console.error);
  }

  function decreaseQtyAPI(item) {
    fetch("https://rwd.up.railway.app/auth/remove-quantity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userEmail,
        itemname: item.itemname
      })
    }).catch(console.error);
  }

  function deleteItemAPI(item) {
    fetch("https://rwd.up.railway.app/auth/delete-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userEmail,
        itemname: item.itemname
      })
    }).catch(console.error);
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "menu.html";
    });
  }
});
