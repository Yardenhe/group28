//Register Validation//---------------------------------------------------

const form = document.getElementById("signUp");
const nameInput = document.querySelector("#first_name");
const lastnameInput = document.querySelector("#last_name");
const phoneInput = document.querySelector("#phone_number");
const emailInput = document.querySelector("#email");
const birthdateInput = document.querySelector("#birth_date");
const passwordInput = document.querySelector("#password");
const usernameInput = document.querySelector("#username");
const confirmPasswordInput = document.querySelector("#confirm-password");
const signupbtn = document.getElementById("signupbtn");

if (form)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate name
    if (nameInput.value.trim() === "") {
      alert("Please enter your name");
      nameInput.focus();
      return;
    }
    // Validate last name
    if (lastnameInput.value.trim() === "") {
      alert("Please enter your last name");
      nameInput.focus();
      return;
    }

    //Validate phone number input field
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phoneInput.value)) {
      alert("Please enter a valid phone number in the format xxx-xxx-xxxx.");
      return false;
    } else {
      phoneInput.setCustomValidity("");
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      alert("Please enter a valid email address");
      emailInput.focus();
      return;
    }
    // Validate birthday
    if (!birthdateInput.value) {
      alert("Please enter a birthdate.");
      return;
    }
    if (new Date(birthdateInput.value) > new Date()) {
      alert("Birthdate cannot be in the future.");
      return;
    }

    // Validate username input field
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if (!usernamePattern.test(usernameInput.value)) {
      alert("Please enter a valid username with only letters and numbers.");
      return false;
    } else if (username.length < 3) {
      alert("Please enter a username with at least 3 characters.");
      return false;
    } else if (username.length > 20) {
      alert("Please enter a username with at most 20 characters.");
      return false;
    } else {
      usernameInput.setCustomValidity("");
    }

    // Validate password
    if (passwordInput.value.trim() === "") {
      alert("Please enter a password");
      passwordInput.focus();
      return;
    }

    // Validate confirm password
    if (confirmPasswordInput.value.trim() === "") {
      alert("Please confirm your password");
      confirmPasswordInput.focus();
      return;
    }
    if (passwordInput.value !== confirmPasswordInput.value) {
      alert("Passwords do not match");
      confirmPasswordInput.focus();
      return;
    }
    form.submit();
  });

// If all validations pass, submit the form
//if (signupbtn) signupbtn.addEventListener("click", function () {});

//End Register Validation//---------------------------------------
//offer Add post//--------------------------------------------------
const modalBtnAdd = document.getElementById("modalbtnAdd");
const Addmodal = document.getElementById("Addmodal");
const closeBtn = document.getElementById("close-btn");

if (modalBtnAdd)
  modalBtnAdd.addEventListener("click", function () {
    Addmodal.style.display = "block";
  });

if (closeBtn)
  closeBtn.addEventListener("click", function () {
    Addmodal.style.display = "none";
  });

//End offer Add post//-----------------------------------------------

//Exchange calculator ----------------------------------------------------------
//take the values from user
var selectedValueFrom = document.getElementById("currencyFrom");
var selectedValueTO = document.getElementById("currencyTO");
var AmountCAL = document.getElementById("AmountCalcuator");
var fromvalue = document.getElementById("fromvalue");
var TOvalue = document.getElementById("TOvalue");
const calculateBtn = document.getElementById("calculateButton");

var exchangeRate = 0;

//this swich case is temporary until we work with DB
//check the two coins exchange and return the amount*exchange rate
function calculateExchange() {
  switch (selectedValueFrom.value + selectedValueTO.value) {
    case "USDEUR":
      exchangeRate = 0.82;
      break;
    case "USDILS":
      exchangeRate = 3.27;
      break;
    case "USDCAD":
      exchangeRate = 1.25;
      break;
    case "USDGBP":
      exchangeRate = 0.72;
      break;
    case "USDJPY":
      exchangeRate = 109.21;
      break;
    case "USDAUD":
      exchangeRate = 1.31;
      break;
    case "USDCHF":
      exchangeRate = 0.91;
      break;
    case "EURUSD":
      exchangeRate = 1.22;
      break;
    case "EURILS":
      exchangeRate = 3.99;
      break;
    case "EURGBP":
      exchangeRate = 0.86;
      break;
    case "EURJPY":
      exchangeRate = 133.48;
      break;
    case "EURCAD":
      exchangeRate = 1.53;
      break;
    case "EURAUD":
      exchangeRate = 1.58;
      break;
    case "EURCHF":
      exchangeRate = 1.09;
      break;
    case "ILSUSD":
      exchangeRate = 0.31;
      break;
    case "ILSEUR":
      exchangeRate = 0.25;
      break;
    case "GBPUSD":
      exchangeRate = 1.39;
      break;
    case "GBPEUR":
      exchangeRate = 1.16;
      break;
    case "GBPILS":
      exchangeRate = 4.53;
      break;
    case "GBPJPY":
      exchangeRate = 151.65;
      break;
    case "GBPCAD":
      exchangeRate = 1.73;
      break;
    case "GBPAUD":
      exchangeRate = 1.81;
      break;
    case "GBPCHF":
      exchangeRate = 1.25;
      break;
    case "JPYUSD":
      exchangeRate = 0.0092;
      break;
    case "JPYEUR":
      exchangeRate = 0.0075;
      break;
    case "JPYILS":
      exchangeRate = 0.029;
      break;
    case "JPYGBP":
      exchangeRate = 0.0066;
      break;
    case "JPYCAD":
      exchangeRate = 0.011;
      break;
    case "JPYAUD":
      exchangeRate = 0.012;
      break;
    case "JPYCHF":
      exchangeRate = 0.0083;
      break;
    case "CADUSD":
      exchangeRate = 0.8;
      break;
    case "CADEUR":
      exchangeRate = 0.65;
      break;
    case "CADILS":
      exchangeRate = 2.54;
      break;
    case "CADGBP":
      exchangeRate = 0.58;
      break;
    case "CADJPY":
      exchangeRate = 89;
  }
  var result = AmountCAL.value * exchangeRate;
  return result;
}

//button and text kistener to view the calculator resuts
if (AmountCAL)
  AmountCAL.addEventListener("input", function () {
    if (selectedValueFrom.value == "none" || selectedValueTO.value == "none")
      alert("please select currency");
    else if (selectedValueFrom.value == selectedValueTO.value)
      alert("Please do not select the same currency");
    else {
      fromvalue.innerHTML = AmountCAL.value + " " + selectedValueFrom.value;
      TOvalue.innerHTML = calculateExchange() + " " + selectedValueTO.value;
    }
  });
calculateBtn.addEventListener("click", function () {
  if (selectedValueFrom.value == "none" || selectedValueTO.value == "none")
    alert("please select currency");
  else if (selectedValueFrom.value == selectedValueTO.value)
    alert("Please do not select the same currency");
  else {
    calculateExchange();
    fromvalue.innerHTML = AmountCAL.value + " " + selectedValueFrom.value;
    TOvalue.innerHTML = calculateExchange() + " " + selectedValueTO.value;
  }
});

//Exchange calculator  end------------------------------------------------------------------
//homepage welcome

var Greeting = document.getElementsByName("Greeting");
Greeting.innerHTML = "hello";
// function checkcookie() {
//   if (document.cookie != " ") {
//     //console.log(document.cookie);
//     Greeting.innerHTML = "hello";
//   }
// }
// checkcookie();
//end hompepage
