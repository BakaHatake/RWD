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

            window.location.href = "flow.html";
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
