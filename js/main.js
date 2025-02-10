let loginEmailInput = document.getElementById("logInEmail");
let loginPasswordInput = document.getElementById("logInPassword");

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
// Login Function...
function logIn() {
  if (
    emailValidation(loginEmailInput) &&
    passwordValidation(loginPasswordInput)
  ) {
    for (const x of allUsers) {
      if (
        x.email === loginEmailInput.value &&
        x.password === loginPasswordInput.value
      ) {
        localStorage.setItem("logedUser", x.name);
        location = "./home.html";
        return;
      }
    }
    document.querySelector(".message").classList.remove("d-none");
  }
}

// Handel Events...
loginEmailInput.addEventListener("blur", function () {
  emailValidation(this);
});
loginPasswordInput.addEventListener("blur", function () {
  passwordValidation(this);
});
document.getElementById("logInBtn").addEventListener("click", logIn);