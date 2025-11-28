document.getElementById("loginButton").addEventListener("click", loginuser);

async function loginuser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Bro fill the fields.");
        return;
    }

    try {
        const res = await fetch("https://rwd.up.railway.app/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();   

        if (res.status === 200 && data.success) {
            alert("Login successful");
            window.location.href = "flow.html";
        } else {
            alert(data.message || "Invalid credentials");
        }

    } catch (err) {
        console.error(err);
        alert("Bro your server fainted. Try again later.");
    }
}
