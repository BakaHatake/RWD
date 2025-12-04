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
                            <button>Add +</button>
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
        console.log("DATA:", data);

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
        console.log("SEARCH DATA:", data);

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

