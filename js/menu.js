const clicked = document.querySelectorAll('.fbox');
clicked[0].classList.add("active");

clicked.forEach(box => {
    box.addEventListener("click", () => {
        clicked.forEach(b => b.classList.remove("active"));
        box.classList.add("active");
        filter(box.textContent);
    });
});

window.onload = async () => {
    // const url = "http://localhost:8080/auth/filter";
    const url = "https://rwd.up.railway.app/auth/filter";

    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: "All" })
    });

    const data = await res.json();
    await renderitems(data.items);
};

async function renderitems(items) {
    const dishBox = document.getElementById('dish');
    dishBox.innerHTML = "";

    items.forEach(item => {
        dishBox.innerHTML += `
            <div class="item">
                <div class="pitem">
                    <img src="${item.imageUrl}">
                </div>
                <div class="titem">
                    <div class="itemtext">
                        <h3>${item.name}</h3>
                        <p>${item.category}</p>
                    </div>
                    <div class="cart">
                        <div class="itemprice">
                            <h5>₹${item.price}</h5>
                        </div>
                        <div class="bcart">
                            <button 
                                class="add-btn" 
                                data-name="${item.name}" 
                                data-price="${item.price}" 
                                data-img="${item.imageUrl}"
                            >Add +</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

async function filter(text) {
    try {
        // const url = "http://localhost:8080/auth/filter";
        const url = "https://rwd.up.railway.app/auth/filter";

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category: text })
        });

        const data = await res.json();
        
        if (res.status === 200 && data.success) {
            renderitems(data.items);
            scrollToDish();
        }

    } catch (err) {
        console.error("Error:", err);
    }
}

const searchInput = document.querySelector(".search input");

searchInput.addEventListener("input", async () => {
    const q = searchInput.value.trim();

    try {
        // const url = "http://localhost:8080/auth/search";
        const url = "https://rwd.up.railway.app/auth/search";

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: q })
        });

        const data = await res.json();
        
        if (res.status === 200 && data.success) {
            renderitems(data.items);
        }

    } catch (err) {
        console.log("ERROR:", err);
    }
});

function scrollToDish() {
    document.getElementById("dish").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}
document.getElementById("cart").addEventListener("click", () => {
    window.location.href = "./cart.html";
});

document.getElementById("profile-icon").addEventListener("click",()=>{
    window.location.href="https://rwd-tau.vercel.app/profile"
}
)

document.getElementById('dish').addEventListener('click', async (e) => {
    
    if (e.target && e.target.classList.contains('add-btn')) {
        
        const btn = e.target;
        let price = btn.dataset.price;
        let src = btn.dataset.img; 
        let name = btn.dataset.name;
        
        let gamil = localStorage.getItem("gmail");

        if (!gamil) {
            alert("Invalid User. Please Login first!");
            window.location.href = "./login.html";
            return;
        }

        try {
            // const url = "http://localhost:8080/auth/add2cart";
            const url = "https://rwd.up.railway.app/auth/add2cart";
            
            const Body = JSON.stringify({
                user: gamil,
                itemprice: price,
                itemsrc: src,
                itemname: name,
            });

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: Body
            });

            console.log("BODY", Body);
            const data = await res.json();
            console.log("DATA:", data);

            if (res.status === 200 && data.success) {
                console.log("Added item:", data);
                alert("Item added to cart!");
            } else {
                console.log("Error adding item");
            }

        } catch (err) {
            console.error("Error:", err);
        }
    }
});

document.querySelectorAll(".kcard").forEach(card => {
  card.addEventListener("click", () => {
    const kitchen = card.dataset.kitchen;
    const gmail = localStorage.getItem("gmail");

    window.location.href =
  "https://rwd-tau.vercel.app/?" +
  "kitchen=" + encodeURIComponent(kitchen) +
  "&gmail=" + encodeURIComponent(gmail);


    // window.location.href =
    //   "http://localhost:5173/?" +
    //   "kitchen=" + encodeURIComponent(kitchen) +
    //   "&gmail=" + encodeURIComponent(gmail);
  });
});

