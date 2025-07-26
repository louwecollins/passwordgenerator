// ========== Range Slider ========== //
let slider = document.getElementById("myRange")
let sliderOutput = document.getElementById("demo");

// ========== Toggle boxes ========== //
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");

// ========== Password showcase ========== //
let password1 = document.getElementById("passwordDisplay1");
let password2 = document.getElementById("passwordDisplay2");

// ========== buttons ========== //
let generateBtn = document.getElementById("generate-btn");
let resetBtn = document.getElementById("restart-btn");
let resetPwd1Btn = document.getElementById("reset-pwd1-btn");
let resetPwd2Btn = document.getElementById("reset-pwd2-btn");
let copyIcon1 = document.getElementById("copy-pwd1-btn");
let copyIcon2 = document.getElementById("copy-pwd2-btn");

// ========== Password alert update ========== //
let alertText = document.getElementById("passwordUpdate");

// ========== Password Character pools ========== //
let upperChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let lowerChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let symbolChars = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];



// Showcase slider value on load
sliderOutput.innerHTML = slider.value;

// Update slider value when moved
slider.oninput = function() {
    let tempSliderValue = this.value;
    sliderOutput.innerHTML = tempSliderValue;

    let progress = (tempSliderValue / slider.max) * 100;

    slider.style.background = `linear-gradient(to right, #CC400C ${progress}%, #d3d3d3 ${progress}%)`;
}



// Main generate button
generateBtn.onclick = function() {

    // picks the slider value and parses it as string to number
  let poollength = parseInt(slider.value, 10);

    // Check that at least slide is active or user has identified password length
     if (poollength < 1){
    alertText.innerText = "Please indicate password length!";
    return "";
  }


  // Check that at least one option is selected
  if (!lowercase.checked && !uppercase.checked && !numbers.checked && !symbols.checked) {
    alertText.innerText = "Select at least one character type!";
    return "";
  }

  // Generate two passwords
  password1.innerText = generatePassword();
  password2.innerText = generatePassword();
  alertText.innerText = 'Click on the "Copy Icon" to copy password';

};



// Create a password based on settings
function generatePassword() {
    // picks the slider value and parses it as string to number
  let poollength = parseInt(slider.value, 10);

  // Building the array to host all the characters together
  let charPool = [];

  if (lowercase.checked) {
    charPool = charPool.concat(lowerChars);
  }
  if (uppercase.checked) {
    charPool = charPool.concat(upperChars);
  }
  if (numbers.checked) {
    charPool = charPool.concat(numberChars);
  }
  if (symbols.checked) {
    charPool = charPool.concat(symbolChars);
  }

  // Generating the random password from the new built character array
  let randomPassword = "";
  for (let i = 0; i < poollength; i++) {
    let idx = Math.floor(Math.random() * charPool.length);
    randomPassword += charPool[idx];
  }

  return randomPassword;
}

// Reset everything
resetBtn.onclick = function() {
    // Reset slider value
  slider.value = 0;
  sliderOutput.innerText = 0;

  // reset toggles
  lowercase.checked = false;
  uppercase.checked = false;
  numbers.checked = false;
  symbols.checked = false;

  // reset passwords field
  password1.innerText = '-';
  password2.innerText = '-';

  // reset alert message
  alertText.innerText = 'Select a character type below';

  // reset slider track color
  slider.style.background = `linear-gradient(to right, #CC400C 0%, #d3d3d3 0%)`;
};


// Reset password 1
resetPwd1Btn.onclick = function() {
    if (!lowercase.checked && !uppercase.checked && !numbers.checked && !symbols.checked) {
    alertText.innerText = "Select at least one character type below!";
    return;
  }
  // Generate password again
  password1.innerText = generatePassword();

  // reset alert message
  alertText.innerText = 'Click on the "Copy Icon" to copy new password';
};

// Reset password 2
resetPwd2Btn.onclick = function() {
    if (!lowercase.checked && !uppercase.checked && !numbers.checked && !symbols.checked) {
    alertText.innerText = "Select at least one character type below!";
    return;
  }
  // Generate password again
  password2.innerText = generatePassword();

  // reset alert message
  alertText.innerText = 'Click on the "Copy Icon" to copy new password';
};



  // Copy to clipboard password 1
  copyIcon1.onclick = function() {
    let text = password1.innerText;
    if (text !== '-') {
      navigator.clipboard.writeText(text);
      alertText.innerText = 'Password 1 copied!';
    }
  };

    // Copy to clipboard password 2
  copyIcon2.onclick = function() {
    let text = password2.innerText;
    if (text !== '-') {
      navigator.clipboard.writeText(text);
      alertText.innerText = 'Password 2 copied!';
    }
  };