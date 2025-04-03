function loginSuccess(userData) {
    localStorage.setItem('currentUser', JSON.stringify({
        ...userData,
        isLoggedIn: true
    }));

    window.location.href = 'index.html';
}

function initLogin() {
    const loginForm = document.getElementById('login-form');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const toggleBtn = document.getElementById('toggle-password');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => FormValidation.togglePasswordVisibility(password, toggleBtn));
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            FormValidation.clearError(username);
            FormValidation.clearError(password);

            let isValid = true;

            if (!FormValidation.validateRequired(username.value)) {
                FormValidation.showError(username, 'Username is required');
                isValid = false;
            }

            if (!FormValidation.validateRequired(password.value)) {
                FormValidation.showError(password, 'Password is required');
                isValid = false;
            }

            if (isValid) {
                loginSuccess({ username: username.value });
            }
        });
    }
}

function initRegister() {
    const registerForm = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordToggle = document.getElementById('passwordToggle');
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');

    if (passwordToggle) {
        passwordToggle.addEventListener('click', () => FormValidation.togglePasswordVisibility(passwordInput, passwordToggle));
    }

    if (confirmPasswordToggle) {
        confirmPasswordToggle.addEventListener('click', () => FormValidation.togglePasswordVisibility(confirmPasswordInput, confirmPasswordToggle));
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const phone = phoneInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            let isValid = true;

            if (!FormValidation.validateRequired(username)) {
                FormValidation.showError('username', 'Username is required');
                isValid = false;
            } else {
                FormValidation.clearError('username');
            }

            if (!FormValidation.validatePhone(phone)) {
                FormValidation.showError('phone', 'Please enter a valid 10-digit phone number');
                isValid = false;
            } else {
                FormValidation.clearError('phone');
            }

            if (!FormValidation.validatePassword(password)) {
                FormValidation.showError('password', 'Password must be at least 6 characters');
                isValid = false;
            } else {
                FormValidation.clearError('password');
            }

            if (password !== confirmPassword) {
                FormValidation.showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            } else {
                FormValidation.clearError('confirmPassword');
            }

            if (isValid) {
                loginSuccess({ username, phone });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('login-form')) {
        initLogin();
    } else if (document.getElementById('registerForm')) {
        initRegister();
    }
}); 