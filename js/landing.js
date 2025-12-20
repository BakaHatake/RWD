document.getElementById("mbutton").addEventListener("click",()=>{
    const token=localStorage.getItem("token");
        if(token){
            window.location.href="menu.html";

        }else{
            window.location.href = "login.html";
        }
    
});
document.getElementById("obutton").addEventListener("click",()=>{
    const token=localStorage.getItem("token");
        if(token){
            window.location.href="menu.html";

        }else{
           alert("Missing details plz use login page ")
        }
    
});