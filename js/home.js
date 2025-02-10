let logedUser= localStorage.getItem("logedUser");
if(!logedUser){
    location="./notFound.html"  
}
document.querySelectorAll(".user")[0].innerText = logedUser;
document.querySelectorAll(".user")[1].innerText = logedUser;
document.querySelector(".logout").addEventListener('click', _=>{
    location="./index.html";
    localStorage.removeItem("logedUser");
});

