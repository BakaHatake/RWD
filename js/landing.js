document.getElementById("mbutton").addEventListener("click",()=>{
    const token=localStorage.getItem("token");
        if(token){
            window.location.href="flow.html";

        }else{
            window.location.href = "login.html";
        }
    
});