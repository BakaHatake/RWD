document.getElementById("loginButton").addEventListener("click", loginuser);

function triggerErrorAnimation(input) {
    input.classList.remove("error");      
    void input.offsetWidth;              
    input.classList.add("error");        
}

async function loginuser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    try {
        // const res =await fetch ("http://localhost:8080/auth/login",
        const res = await fetch("https://rwd.up.railway.app/auth/login",
             {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();   
        console.log("STATUS:", res.status);
        console.log("DATA:", data);

        const emailInput = document.getElementById("email");
        const passInput = document.getElementById("password");
        if (res.status === 200 && data.success) {
            localStorage.setItem("token", data.jwtToke);

            window.location.href = "menu.html";
        } 
    else if (res.status === 409) {
    if (data.type === "email") {
        emailInput.value = "";
        emailInput.placeholder = "User doesnt exists";
        triggerErrorAnimation(emailInput);
    }

    if (data.type === "pass") {
        passInput.value = "";
        passInput.placeholder = "Invalid Password";
        triggerErrorAnimation(passInput);
    }
}
    else if(res.status === 400){
        emailInput.value = "";
        emailInput.placeholder = "Invalid Email";
        triggerErrorAnimation(emailInput);
        passInput.value = "";
        passInput.placeholder = "Invalid Password";
        triggerErrorAnimation(passInput);

    }


    } catch (err) {
        console.error(err);
        alert("Bro your server fainted. Try again later.");
    }
}

document.getElementById("bsignupButton").addEventListener("click", bsignup);

async function bsignup() {
    const name = document.getElementById("fullname");
    const phone = document.getElementById("phone");
    const email = document.getElementById("semail");
    const roll = document.getElementById("roll");
    const gender = document.getElementById("gender");
    const campus = document.getElementById("campus");
    const pass = document.getElementById("spassword");
    const cpass = document.getElementById("confirmpass");

    let hasError = false;

    // REQUIRED CHECKS ---------------------
    if (name.value.trim() === "") {
        triggerErrorAnimation(name);
        name.placeholder = "Name required Bruh";
        hasError = true;
    }

    if (phone.value.trim() === "") {
        triggerErrorAnimation(phone);
        phone.placeholder = "Phone required Bruh";
        hasError = true;
    }

    if (email.value.trim() === "") {
        triggerErrorAnimation(email);
        email.placeholder = "Email required Bruh";
        hasError = true;
    }

    if (roll.value.trim() === "") {
        triggerErrorAnimation(roll);
        roll.placeholder = "USN required Bruh";
        hasError = true;
    }

    if (gender.value === "") {
        triggerErrorAnimation(gender);
        hasError = true;
    }

    if (campus.value.trim() === "") {
        triggerErrorAnimation(campus);
        campus.placeholder = "Campus required Bruh";
        hasError = true;
    }

    if (pass.value.trim() === "") {
        triggerErrorAnimation(pass);
        pass.placeholder = "Password required Bruh";
        hasError = true;
    }

    if (cpass.value.trim() === "") {
        triggerErrorAnimation(cpass);
        cpass.placeholder = "Confirm password Bruh";
        hasError = true;
    }

    if (hasError) return;

    const nameregex = /^[A-Za-z ]+$/;
    if (!nameregex.test(name.value.trim())) {
        name.value = "";
        name.placeholder = "Invalid name Bruh";
        triggerErrorAnimation(name);
        hasError = true;
    }

    const phonereg = /^[0-9]+$/;
    if (!phonereg.test(phone.value.trim())) {
        phone.value = "";
        phone.placeholder = "Invalid Number Bruh";
        triggerErrorAnimation(phone);
        hasError = true;
    }

    if (!email.checkValidity()) {
        email.value = "";
        email.placeholder = "Invalid email Bruh";
        triggerErrorAnimation(email);
        hasError = true;
    }

    const croll = /^[A-Za-z0-9]+$/;
    if (!croll.test(roll.value.trim())) {
        roll.value = "";
        roll.placeholder = "Invalid USN Bruh";
        triggerErrorAnimation(roll);
        hasError = true;
    }

    if (campus.value.trim().toLowerCase() !== "ait campus") {
        campus.value = "";
        campus.placeholder = "ONLY AIT Campus Bruh";
        triggerErrorAnimation(campus);
        hasError = true;
    }

    const strongPass =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const password = pass.value.trim();
    const confirmPassword = cpass.value.trim();

    if (!strongPass.test(password)) {
        pass.value = "";
        pass.placeholder = "Weak password Bruh";
        triggerErrorAnimation(pass);
        hasError = true;
    }

    if (confirmPassword !== password) {
        cpass.value = "";
        cpass.placeholder = "Passwords don't match Bruh";
        triggerErrorAnimation(cpass);
        hasError = true;
    }

    if (hasError) return;

    const bodydata = {
        name: name.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim(),
        usn: roll.value.trim(),
        gender: gender.value,
        campus: campus.value.trim(),
        password: password
    };

    console.log("Sending :", bodydata);

    try {
        const res = await fetch("https://rwd.up.railway.app/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodydata)
        });

        const data = await res.json();

        if (res.status == 201) {
            alert("Account Created Successfully!");
            window.location.href = "login.html";
        } else {
            alert("Server rejected your signup. Fix your data maybe?");
        }

    } catch (err) {
        console.error(err);
        alert("Server died again. Pray for it.");
    }
}
