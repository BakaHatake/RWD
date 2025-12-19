document.addEventListener('DOMContentLoaded', () => {

    const TAX_RATE = 0.05; 
    const FEE_ASAP = 10;   
    const FEE_SCHEDULE = 5; 
    
    const cartContainer = document.querySelector('.cart-items-container');
    const payValues = document.querySelectorAll('.pay-value'); 
    const ctaButton = document.querySelector('.cta-button');
    const backBtn = document.querySelector('.back-btn');
    const tabAsap = document.getElementById('tab-asap');
    const tabSchedule = document.getElementById('tab-schedule');
    const contentAsap = document.getElementById('content-asap');
    const contentPreorder = document.getElementById('content-preorder');
    const feeLabelRow = payValues[1].previousElementSibling; 
    
    let currentFee = FEE_ASAP; 
    let cartItems = []; 
    const userEmail = localStorage.getItem("gmail");
    
    if (!userEmail) {
        alert("Please log in to view your cart.");
        window.location.href = "login.html";
    } else {
        loadCart();
    }
    
   const chips = document.querySelectorAll(".time-chips .chip");
   const timeText = document.querySelector(".footer-note .orange-text");

   chips.forEach((chip) => {
     chip.addEventListener("click", () => {
       chips.forEach(c => c.classList.remove("active"));
       chip.classList.add("active");
       const minutes = chip.textContent.split(" ")[0];
       timeText.textContent = `${minutes} minutes`;
  });
});
   const dateDropdown = document.getElementById("dateDropdown");

   const dateOptions = [
     "🗓️ Today",
     "🗓️ Tomorrow",
     "🗓️ Day After Tomorrow"
];

  let index = 0;

   function updateDate() {
     const date = new Date();
     date.setDate(date.getDate() + index);

     const formattedDate = date.toLocaleDateString("en-IN", {
       day: "numeric",
       month: "short"
  });

     dateDropdown.innerHTML =
    `   ${dateOptions[index]}, ${formattedDate} <span class="arrow">▼</span>`;
}
   updateDate();
   dateDropdown.addEventListener("click", () => {
        index = (index + 1) % dateOptions.length;
     updateDate();
});
const timeDropdown = document.getElementById("timeDropdown");

const timeOptions = [
  "⏰ 9:00 AM",
  "⏰ 10:00 AM",
  "⏰ 11:00 AM",
  "⏰ 12:00 PM",
  "⏰ 1:00 PM",
  "⏰ 2:00 PM",
  "⏰ 3:00 PM",
  "⏰ 4:00 PM",
  "⏰ 5:00 PM",
  "⏰ 6:00 PM"
];

let timeIndex = 0;

timeDropdown.innerHTML = `${timeOptions[timeIndex]} <span class="arrow">▼</span>`;

timeDropdown.addEventListener("click", () => {
  timeIndex = (timeIndex + 1) % timeOptions.length;
  timeDropdown.innerHTML =
    `${timeOptions[timeIndex]} <span class="arrow">▼</span>`;
});


const timeDropdown1 = document.getElementById("timeDropdown");
const finalTimeText = document.getElementById("finalTimeText");
const mealButtons = document.querySelectorAll(".pill-btn");

const mealTimeMap = {
  Breakfast: "9:00 AM",
  Lunch: "12:45 PM",
  Snack: "5:00 PM",
  Dinner: "Time Up Bruhh!!"
};

let selectedMeal = "Lunch";
let selectedTime = mealTimeMap[selectedMeal];

updateUI();
mealButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    mealButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    selectedMeal = btn.textContent;
    selectedTime = mealTimeMap[selectedMeal];

    updateUI();
  });
});
function updateUI() {
  timeDropdown1.innerHTML =
    `⏰ ${selectedTime} <span class="arrow">▼</span>`;

  finalTimeText.textContent =
    `${selectedTime} (${selectedMeal})`;
}




    async function loadCart() {
        try {
            // const url = "http://localhost:8080/auth/returncart";
            const url = "https://rwd.up.railway.app/auth/returncart";

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: userEmail })
            });

            const data = await res.json();

            if (res.status === 200 && data.success) {
                cartItems = data.items; 
                renderCartItems();
                updateTotals();
            } else {
                cartContainer.innerHTML = `<div style="text-align:center; padding:20px; color:#888;">Cart is empty</div>`;
                cartItems = [];
                updateTotals(); 
            }

        } catch (err) {
            console.error(err);
            cartContainer.innerHTML = `<div style="text-align:center; padding:20px; color:red;">Error loading cart</div>`;
        }
    }

    function renderCartItems() {
        if (cartItems.length === 0) {
            cartContainer.innerHTML = `<div style="text-align:center; padding:50px; color:#888;">Your cart is empty!</div>`;
            ctaButton.disabled = true;
            ctaButton.style.opacity = '0.5';
            return;
        }

        ctaButton.disabled = false;
        ctaButton.style.opacity = '1';
        cartContainer.innerHTML = ""; 

        cartItems.forEach(item => {
            const isVeg = !item.itemname.toLowerCase().includes("chicken"); 
            const vegIconClass = isVeg ? "veg" : "non-veg";

            const cardHTML = `
                <div class="cart-card" data-id="${item._id}" data-name="${item.itemname}">
                    <div class="card-content">
                        <img src="${item.itemsrc}" alt="${item.itemname}" class="item-img">
                        <div class="item-details">
                            <div class="title-row">
                                <span class="veg-icon ${vegIconClass}"></span>
                                <h3>${item.itemname}</h3>
                            </div>
                            <p class="sub-text">From: Canteen</p>
                            <div class="price">₹${item.itemprice}</div>
                        </div>
                    </div>
                    <div class="card-actions">
                        <div class="qty-pill">
                            <button class="qty-btn is-minus">−</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn is-plus">+</button>
                        </div>
                        <button class="delete-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            cartContainer.innerHTML += cardHTML;
        });
    }

    function updateTotals() {
        let itemTotal = 0;
        
        cartItems.forEach(item => {
            itemTotal += item.itemprice * item.quantity;
        });

        const tax = Math.round(itemTotal * TAX_RATE);
        const grandTotal = itemTotal + tax + currentFee;

        payValues[0].innerText = `₹${itemTotal}`;
        payValues[1].innerText = `₹${currentFee}`;
        payValues[2].innerText = `₹${tax}`;
        payValues[3].innerText = `₹${grandTotal}`;
        
        ctaButton.innerHTML = `Pay & Order • ₹${grandTotal} <span class="arrow">→</span>`;
    }

    cartContainer.addEventListener('click', async (e) => {
        const target = e.target;
        const card = target.closest('.cart-card');
        
        if (!card) return;

        const itemName = card.dataset.name;
        const itemData = cartItems.find(i => i.itemname === itemName);

        if (target.closest('.is-plus')) {
            await increaseQtyAPI(itemData);
        }

        if (target.closest('.is-minus')) {
            await decreaseQtyAPI(itemData);
        }

        if (target.closest('.delete-btn')) {
             await deleteItemAPI(itemData);
        }
    });

    async function increaseQtyAPI(item) {
        const payload = {
            user: userEmail,
            itemname: item.itemname,
            itemprice: item.itemprice,
            itemsrc: item.itemsrc
        };

        try {
            // const url = "http://localhost:8080/auth/add2cart";
            const url = "https://rwd.up.railway.app/auth/add2cart";

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            
            const data = await res.json();
            if (res.status === 200 && data.success) {
                loadCart(); 
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function decreaseQtyAPI(item) {
        const payload = {
            user: userEmail,
            itemname: item.itemname
        };

        try {
            // const url = "http://localhost:8080/auth/remove-quantity";
            const url = "https://rwd.up.railway.app/auth/remove-quantity";

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.status === 200 && data.success) {
                loadCart();
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteItemAPI(item) {
        const payload = {
            user: userEmail,
            itemname: item.itemname
        };

        try {
            // const url = "http://localhost:8080/auth/delete-item";
            const url = "https://rwd.up.railway.app/auth/delete-item";

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.status === 200 && data.success) {
                loadCart();
            }
        } catch (err) {
            console.error(err);
        }
    }

    function switchTab(isAsap) {
        if (isAsap) {
            tabAsap.classList.add('active');
            tabSchedule.classList.remove('active');
            contentAsap.classList.remove('hidden');
            contentPreorder.classList.add('hidden');
            currentFee = FEE_ASAP;
            feeLabelRow.innerText = "Convenience Fee";
        } else {
            tabSchedule.classList.add('active');
            tabAsap.classList.remove('active');
            contentPreorder.classList.remove('hidden');
            contentAsap.classList.add('hidden');
            currentFee = FEE_SCHEDULE;
            feeLabelRow.innerText = "Convenience Fee (Pre-order)";
        }
        updateTotals();
    }

    tabAsap.addEventListener('click', () => switchTab(true));
    tabSchedule.addEventListener('click', () => switchTab(false));

    const timeChips = document.querySelectorAll('.time-chips .chip');
    timeChips.forEach(chip => {
        chip.addEventListener('click', () => {
            timeChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });

    const mealPills = document.querySelectorAll('.quick-select-row .pill-btn');
    mealPills.forEach(pill => {
        pill.addEventListener('click', () => {
            mealPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    if(backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'menu.html';
        });
    }
});