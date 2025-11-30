let loginTab = document.getElementById('loginTab');
let signupTab = document.getElementById('signupTab');
let login =document.getElementById('login');
let signup =document.getElementById('signup');
let ssignupright = document.getElementById('ssignupright');
let logright = document.getElementById('logright');
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

loginTab.addEventListener('click', () => {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
     console.log("clicked");
     login.style.display="block";
     signup.style.display="none";
     ssignupright.style.display="none";
     logright.style.display="block";
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    console.log("clicked");
    login.style.display="none";
    signup.style.display="block";
    ssignupright.style.display="block";
    logright.style.display="none";
});

togglePassword.addEventListener("click",()=>{
    const isPassword=passwordInput.type==="password"
    passwordInput.type=isPassword?"Text":"password"
    togglePassword.textContent = isPassword ? "🙈" : "👁️";
});
