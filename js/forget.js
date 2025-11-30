const inputEl = document.getElementById("input");
const otpBtn = document.getElementById("otp-btn");

function triggerErrorAnimation(input) {
    input.classList.remove("error");
    void input.offsetWidth;
    input.classList.add("error");
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

async function sendOTP() {
    const email = inputEl.value.trim();

    if (!isValidEmail(email)) {
        inputEl.value = "";
        inputEl.placeholder = "Enter valid email";
        triggerErrorAnimation(inputEl);
        return;
    }

    try {
        // const res =await fetch ("http://localhost:8080/auth/forget",
        const res = await fetch("https://rwd.up.railway.app/auth/forget", 
            {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),

        });

        const data = await res.json();
        console.log("DATA:", data);

        if (res.status === 200 && data.success) {
            alert("OTP sent dont clear email now enter otp to verify")
        }

        else if (res.status === 404) {
            inputEl.value = "";
            inputEl.placeholder = "No user with this email";
            triggerErrorAnimation(inputEl);
        }

        else if (res.status === 429) {
            inputEl.value = "";
            inputEl.placeholder = data.message; 
            triggerErrorAnimation(inputEl);
        }

        else {
            inputEl.value = "";
            inputEl.placeholder = "Failed. Try again.";
            triggerErrorAnimation(inputEl);
        }

    } catch (error) {
        console.error("Frontend error:", error);
        alert("Server fainted again. Try later.");
    }}
async function verifyOTP() {
    const email = inputEl.value.trim();
    let boxes = document.querySelectorAll(".otp-box");
    let otp = "";

    boxes.forEach(box => otp += box.value.trim());

    if (otp.length !== 6) {
        triggerErrorAnimation(boxes[0]);
        alert("Enter all 6 digits.");
        return;
    }

    try {
        // const res = await fetch("http://localhost:8080/auth/verify",
        const res = await fetch("https://rwd.up.railway.app/auth/verify",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();
        console.log("VERIFY:", data);

        if (res.status === 200 && data.success) {
            alert("OTP verified! Proceeding...");
            window.location.href = "reset.html";
            return;
        }

        if (data.message.includes("expired")) {
            alert("OTP expired. Click 'Get OTP' again.");
            return;
        }

        if (data.message.includes("Invalid")) {
            triggerErrorAnimation(boxes[0]);
            boxes.forEach(box => box.value = "");
            alert("Invalid OTP. Try again.");
            return;
        }

        if (data.message.includes("No OTP")) {
            alert("No OTP found. Click 'Get OTP' to request again.");
            return;
        }

        alert("Verification failed. Try again.");

    } catch (err) {
        console.error(err);
        alert("Server fainted again.");
    }
}


otpBtn.addEventListener("click", sendOTP);
document.getElementById("verify-btn").addEventListener("click", verifyOTP);

