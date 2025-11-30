let loginTab = document.getElementById('loginTab');
let signupTab = document.getElementById('signupTab');
let login =document.getElementById('login');
let signup =document.getElementById('signup');
let ssignupright = document.getElementById('ssignupright');
let logright = document.getElementById('logright');
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const passwordInput1 = document.getElementById("spassword");
const togglePassword1 = document.getElementById("togglePassword1");
const passwordInput2 = document.getElementById("confirmpass");
const togglePassword2 = document.getElementById("togglePassword2");


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

togglePassword1.addEventListener("click",()=>{
    const isPassword=passwordInput1.type==="password"
    passwordInput1.type=isPassword?"Text":"password"
    togglePassword1.textContent = isPassword ? "🙈" : "👁️";
});

togglePassword2.addEventListener("click",()=>{
    const isPassword=passwordInput2.type==="password"
    passwordInput2.type=isPassword?"Text":"password"
    togglePassword2.textContent = isPassword ? "🙈" : "👁️";
});