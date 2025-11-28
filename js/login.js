let loginTab = document.getElementById('loginTab');
let signupTab = document.getElementById('signupTab');

let loginBtn = document.getElementById('loginButton');
let signupBtn = document.getElementById('signupButton');

loginTab.addEventListener('click', () => {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
     console.log("clicked");
    loginBtn.style.display = "block";
    signupBtn.style.display = "none";
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    console.log("clicked");
    signupBtn.style.display = "block";
    loginBtn.style.display = "none";
});
