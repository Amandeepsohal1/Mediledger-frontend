const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    const expanded = menuToggle.getAttribute("aria-expanded") === "true" || false;
    menuToggle.setAttribute("aria-expanded", !expanded);
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      nav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", false);
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

const frequencySelect = document.getElementById('frequency');
const reminderTimesDiv = document.querySelector('.reminder-times');
let customInput = null;

function clearReminderInputs() {
  if (!reminderTimesDiv) return;
  const label = reminderTimesDiv.querySelector('label');
  reminderTimesDiv.innerHTML = label ? '' : reminderTimesDiv.innerHTML;
  if(label) reminderTimesDiv.appendChild(label);
}

function addReminderInputs(count) {
  if (!reminderTimesDiv) return;
  clearReminderInputs();
  for(let i=1; i <= count; i++) {
    const inputId = 'reminderTime' + i;

    const labelElem = document.createElement('label');
    labelElem.setAttribute('for', inputId);
    labelElem.textContent = 'Reminder Time ' + i;
    labelElem.classList.add('reminder-time-label');
    labelElem.style.color = '#754EFF';
    labelElem.style.fontWeight = '600';
    labelElem.style.marginTop = '10px';

    const inputElem = document.createElement('input');
    inputElem.type = 'time';
    inputElem.id = inputId;
    inputElem.name = inputId;
    inputElem.required = true;
    inputElem.classList.add('extra-time-input');
    inputElem.style.borderRadius = '12px';
    inputElem.style.padding = '10px';

    reminderTimesDiv.appendChild(labelElem);
    reminderTimesDiv.appendChild(inputElem);
  }
}

function showCustomInput() {
  if (!reminderTimesDiv || !frequencySelect) return;
  if (!customInput) {
    customInput = document.createElement('input');
    customInput.type = 'number';
    customInput.id = 'customFrequency';
    customInput.min = 1;
    customInput.max = 10;
    customInput.placeholder = 'No. of times per day (max 10)';
    customInput.style.marginTop = '10px';
    customInput.style.marginBottom = '10px';
    frequencySelect.parentNode.appendChild(customInput);

    customInput.addEventListener('input', function() {
      let num = Math.max(1, Math.min(parseInt(this.value) || 1, 10));
      this.value = num;
      addReminderInputs(num);
    });
  }
  customInput.style.display = '';
  customInput.value = 1;
  addReminderInputs(1);
}

function hideCustomInput() {
  if(customInput) customInput.style.display = 'none';
}

if (frequencySelect) {
  frequencySelect.addEventListener('change', function() {
    if(this.value === 'once_a_day'){
      hideCustomInput();
      addReminderInputs(1);
    } else if(this.value === 'twice_a_day'){
      hideCustomInput();
      addReminderInputs(2);
    } else if(this.value === 'thrice_a_day'){
      hideCustomInput();
      addReminderInputs(3);
    } else if(this.value === 'custom'){
      showCustomInput();
    }
  });
}


function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}
function isValidPassword(password) {
  // Min 8, at least upper, lower, number
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

const showSignUpBtn = document.getElementById('showSignUp');
const cancelSignUpBtn = document.getElementById('cancelSignUp');
const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');

if(showSignUpBtn && cancelSignUpBtn && loginForm && signUpForm) {
  showSignUpBtn.addEventListener('click', e => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signUpForm.style.display = 'flex';
  });

  cancelSignUpBtn.addEventListener('click', e => {
    e.preventDefault();
    signUpForm.style.display = 'none';
    loginForm.style.display = 'flex';
  });
}

if(signUpForm) signUpForm.addEventListener('submit', function(e) {
  const email = this.newEmail ? this.newEmail.value.trim() : '';
  const password = this.newPassword ? this.newPassword.value.trim() : '';
  if (!isValidEmail(email)) {
    e.preventDefault();
    alert('Please enter a valid email address.');
    return;
  }
  if (!isValidPassword(password)) {
    e.preventDefault();
    alert('Password must be at least 8 characters, include uppercase, lowercase, and a number.');
    return;
  }
});


function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}
function isValidPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}


const requestOtpForm = document.getElementById('requestOtpForm');
const otpForm = document.getElementById('otpForm');
const emailInput = document.getElementById('forgotEmail');
const phoneInput = document.getElementById('forgotPhone');
const methodRadios = document.querySelectorAll('input[name="method"]');
const emailGroup = document.getElementById('emailGroup');
const phoneGroup = document.getElementById('phoneGroup');

let currentOTP = null;

if(methodRadios){
  methodRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if(emailGroup && phoneGroup){
        if(radio.value === 'email' && radio.checked){
          emailGroup.style.display = '';
          phoneGroup.style.display = 'none';
        }else if(radio.value === 'phone' && radio.checked){
          emailGroup.style.display = 'none';
          phoneGroup.style.display = '';
        }
      }
    });
  });
}

if(requestOtpForm && otpForm){
  requestOtpForm.addEventListener('submit', function(e){
    e.preventDefault();
    let method = document.querySelector('input[name="method"]:checked').value;
    let value = method === 'email'
      ? emailInput.value.trim()
      : phoneInput.value.trim();

    if((method === 'email' && !isValidEmail(value)) || (method === 'phone' && !isValidPhone(value))){
      alert('Please enter a valid registered ' + method + ' address!');
      return;
    }
 
    currentOTP = Math.floor(100000 + Math.random()*900000).toString();
    alert('Your OTP is: ' + currentOTP + '\n(Simulated; use for demo/testing.)');
    requestOtpForm.style.display = 'none';
    otpForm.style.display = 'flex';
  });
}


if(otpForm){
  otpForm.addEventListener('submit', function(e){
    e.preventDefault();
    const otpEntered = document.getElementById('otp').value.trim();
    const password = document.getElementById('newResetPassword').value.trim();

    if(!currentOTP || otpEntered !== currentOTP){
      alert('Invalid OTP! Please try again.');
      return;
    }
    if(!isValidPassword(password)){
      alert('Password must be at least 8 characters, include uppercase, lowercase, and a number.');
      return;
    }
    alert('Password changed successfully!');
    otpForm.reset();
    window.location.href = 'login.html';
  });
}
