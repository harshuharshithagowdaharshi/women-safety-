function validateRequired(value) {
    return value.trim() !== '';
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password, minLength = 6) {
    return password.length >= minLength;
}

function validatePhone(phone) {
    return /^\d{10}$/.test(phone);
}

function showError(input, errorMsg) {
    const id = typeof input === 'string' ? input : input.id;
    const errorId = `${id}-error`;
    const errorElement = document.getElementById(errorId);
    const inputElement = typeof input === 'string' ? document.getElementById(input) : input;

    if (errorElement) errorElement.textContent = errorMsg;
    if (inputElement) inputElement.classList.add('error');
}

function clearError(input) {
    const id = typeof input === 'string' ? input : input.id;
    const errorId = `${id}-error`;
    const errorElement = document.getElementById(errorId);
    const inputElement = typeof input === 'string' ? document.getElementById(input) : input;

    if (errorElement) errorElement.textContent = '';
    if (inputElement) inputElement.classList.remove('error');
}

function validateFutureDate(dateString) {
    if (!dateString) return false;

    const selectedDate = new Date(dateString);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate >= today;
}

function togglePasswordVisibility(passwordInput, toggleButton) {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    toggleButton.textContent = type === 'password' ? 'Show' : 'Hide';
}

window.FormValidation = {
    validateRequired,
    validateEmail,
    validatePassword,
    validatePhone,
    validateFutureDate,
    showError,
    clearError,
    togglePasswordVisibility
}; 
