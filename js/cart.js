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

    function updateTotals() {
        let itemTotal = 0;
    
        const cards = document.querySelectorAll('.cart-card');
        
        cards.forEach(card => {
 
            const priceText = card.querySelector('.price').innerText.replace('₹', '');
            const price = parseFloat(priceText);
    
            const qtyText = card.querySelector('.qty-pill span').innerText;
            const qty = parseInt(qtyText);

            itemTotal += price * qty;
        });
        const tax = Math.round(itemTotal * TAX_RATE);
        const grandTotal = itemTotal + tax + currentFee;
        payValues[0].innerText = `₹${itemTotal}`;
        payValues[1].innerText = `₹${currentFee}`;
        payValues[2].innerText = `₹${tax}`;
    
        payValues[3].innerText = `₹${grandTotal}`;
        ctaButton.innerHTML = `Pay & Order • ₹${grandTotal} <span class="arrow">→</span>`;
    }

    cartContainer.addEventListener('click', (e) => {
        const target = e.target;
        const card = target.closest('.cart-card');
        if (target.closest('.delete-btn')) {
            card.remove();
            updateTotals();
            checkEmptyCart();
        }
        if (target.classList.contains('is-plus')) {
            const qtySpan = card.querySelector('.qty-pill span');
            let qty = parseInt(qtySpan.innerText);
            qty++;
            qtySpan.innerText = qty;
            updateTotals();
        }
        if (target.classList.contains('qty-btn') && !target.classList.contains('is-plus')) {
            const qtySpan = card.querySelector('.qty-pill span');
            let qty = parseInt(qtySpan.innerText);
            if (qty > 1) {
                qty--;
                qtySpan.innerText = qty;
                updateTotals();
            }
        }
    });
    function checkEmptyCart() {
        const cards = document.querySelectorAll('.cart-card');
        if (cards.length === 0) {
            cartContainer.innerHTML = `<div style="text-align:center; padding:20px; color:#888;">Your cart is empty!</div>`;
            document.querySelector('.cta-button').disabled = true;
            document.querySelector('.cta-button').style.opacity = '0.5';
        }
    }
    function switchTab(isAsap) {
        if (isAsap) {
            // Activate ASAP
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
            const footerSpan = document.querySelector('#content-asap .footer-note span');
            if(footerSpan) footerSpan.innerText = `${chip.innerText.toLowerCase()}`; 
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
    updateTotals();
});