let userNameInput = document.getElementById("signUpUserName");
let emailInput = document.getElementById("signUpEmail");
let passwordInput = document.getElementById("signUpPassword");
let rePasswordInput = document.getElementById("signUpRepassword");

let allUsers = [];
if (localStorage.getItem("allUsers") != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}
// Error Function...
function catchError(input, message) {
  const elemParent = input.parentElement;
  const msgBlock = elemParent.querySelector(".error");
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  msgBlock.innerText = message;
}
// Success Function...
function setSuccess(input) {
  const elemParent = input.parentElement;
  const msgBlock = elemParent.querySelector(".error");
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  msgBlock.innerText = "";
}
// User Name Validation Function...
function userNameValidation(input) {
  const regex = /^[a-z]{3,8}([-_]?[a-z]{3,8})?$/;
  if (input.value == "") {
    catchError(input, "Required Field!");
  } else if (!regex.test(input.value)) {
    catchError(input, "Invalid Username");
  } else {
    setSuccess(input);
    return true;
  }
}
// Email Validation Function...
function emailValidation(input) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (input.value == "") {
    catchError(input, "Required Field!");
  } else if (!regex.test(input.value)) {
    catchError(input, "Invalid Email Address!");
  } else {
    setSuccess(input);
    return true;
  }
}
// Password Validation Function...
function passwordValidation(input) {
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (input.value == "") {
    catchError(input, "Required Field!");
  } else if (!regex.test(input.value)) {
    catchError(
      input,
      "Password must start with capital and includes special char!"
    );
  } else {
    setSuccess(input);
    return true;
  }
}
// Re-Password Validation Function...
function rePasswordValidation(input) {
  if (input.value == "") {
    catchError(input, "Required Field!");
  } else if (input.value !== passwordInput.value) {
    catchError(input, "Don't match with Password!");
  } else {
    setSuccess(input);
    return true;
  }
}
// Sign Up Function...
function signUp(){
if(userNameValidation(userNameInput)&&emailValidation(emailInput)&&passwordValidation(passwordInput)&&rePasswordValidation(rePasswordInput)){
    let user={
        name: userNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        repassword: rePasswordInput.value,
    }
    if(allUsers.map(x=>x.email).includes(emailInput.value)==true){
        document.querySelector(".exist-message").classList.remove("d-none");
    }
    else{
        allUsers.push(user);
        localStorage.setItem("allUsers",JSON.stringify(allUsers));
        location="./index.html";
    }
}
}
// Handel Events...
userNameInput.addEventListener("blur", function () {
  userNameValidation(this);
});
emailInput.addEventListener("blur", function () {
  emailValidation(this);
});
passwordInput.addEventListener("blur", function () {
  passwordValidation(this);
});
rePasswordInput.addEventListener("blur", function () {
  rePasswordValidation(this);
});
document.getElementById("signUpBtn").addEventListener("click", signUp);