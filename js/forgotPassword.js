let reCoverEmailInput = document.getElementById("reCoverEmail");
let reNewPasswordInput = document.getElementById("reNewPassword");
let reNewRePasswordInput = document.getElementById("reNewRePassword");

let allUsers = [];
if (localStorage.getItem("allUsers") != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}
// Error Function
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
// RePassword Validation Function...
function rePasswordValidation(input) {
  if (input.value == "") {
    catchError(input, "Required Field!");
  } else if (input.value !== reNewPasswordInput.value) {
    catchError(input, "Don't match with Password!");
  } else {
    setSuccess(input);
    return true;
  }
}
// ReCover Email Function...
function recoverEmail() {
  if (emailValidation(reCoverEmailInput)) {
    let mails = [];
    allUsers.map((user) => mails.push(user.email));
    if (mails.includes(reCoverEmailInput.value)) {
      document.querySelector("#recoverSection").classList.add("d-none");
      document.querySelector("#reNewSection").classList.remove("d-none");
      localStorage.setItem("catchEmail", reCoverEmailInput.value);
    } else {
      document.querySelector(".notFound").classList.remove("d-none");
    }
  }
}
// ReNew Password Function...
function reNewPass() {
  if (
    passwordValidation(reNewPasswordInput) &&
    rePasswordValidation(reNewRePasswordInput)
  ) {
    for (const x of allUsers) {
      if (x.email == localStorage.getItem("catchEmail")) {
        let user = x;
        user.password = reNewPasswordInput.value;
        user.repassword = reNewRePasswordInput.value;
        allUsers.splice(allUsers.indexOf(x), 1, user);
        localStorage.setItem("allUsers", JSON.stringify(allUsers));
        location = "./index.html";
      }
    }
  }
}
// Handel Events...
reCoverEmailInput.addEventListener("blur", function () {
  emailValidation(this);
});
reNewPasswordInput.addEventListener("blur", function () {
  passwordValidation(this);
});
reNewRePasswordInput.addEventListener("blur", function () {
  rePasswordValidation(this);
});
document.getElementById("reCoverBtn").addEventListener("click", recoverEmail);
document.getElementById("reNewBtn").addEventListener("click", reNewPass);
