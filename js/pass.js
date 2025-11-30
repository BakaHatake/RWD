function togglePass(id, icon) {
    const input = document.getElementById(id);
    const typeNow = input.type === "password" ? "text" : "password";
    input.type = typeNow;
    icon.textContent = typeNow === "password" ? "👁️" : "🙈";
}
async function resetPassword() {
    const email = localStorage.getItem("resetEmail");  
    console.log("RESET EMAIL:", email); 

    const newPassword = document.getElementById("pass1").value.trim();
    const confirmPassword = document.getElementById("pass2").value.trim();

    if (!email) {
        alert("Email missing. Restart the reset process.");
        return;
    }

    if (!newPassword || !confirmPassword) {
        alert("Enter password in both fields");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        // const res = await fetch("http://localhost:8080/auth/reset",
        const res = await fetch("https://rwd.up.railway.app/auth/reset",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                newPassword,
                confirmPassword
            })
        });

        const data = await res.json();
        console.log("RESET RESPONSE:", data);

        if (res.status === 200 && data.success) {
            alert("Password reset successfully!");
            localStorage.removeItem("resetEmail");

            window.location.href = "login.html";
        } else {
            alert(data.message || "Something went wrong.");
        }

    } catch (err) {
        console.error(err);
        alert("Server fainted again.");
    }
}

document.getElementById("reset-btn").addEventListener("click", resetPassword);
