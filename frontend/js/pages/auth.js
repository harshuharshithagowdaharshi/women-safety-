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
        loginForm.addEventListener('submit', async (e) => {
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
                try {
                    await window.api.login(username.value, password.value);
                    window.location.href = 'index.html';
                } catch (error) {
                    FormValidation.showError(password, error.message || 'Invalid credentials');
                }
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
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const phone = phoneInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            let isValid = true;

            if (!FormValidation.validateRequired(username)) {
                FormValidation.showError(usernameInput, 'Username is required');
                isValid = false;
            } else {
                FormValidation.clearError(usernameInput);
            }

            if (!FormValidation.validatePhone(phone)) {
                FormValidation.showError(phoneInput, 'Please enter a valid 10-digit phone number');
                isValid = false;
            } else {
                FormValidation.clearError(phoneInput);
            }

            if (!FormValidation.validatePassword(password)) {
                FormValidation.showError(passwordInput, 'Password must be at least 6 characters');
                isValid = false;
            } else {
                FormValidation.clearError(passwordInput);
            }

            if (password !== confirmPassword) {
                FormValidation.showError(confirmPasswordInput, 'Passwords do not match');
                isValid = false;
            } else {
                FormValidation.clearError(confirmPasswordInput);
            }

            if (isValid) {
                try {
                    await window.api.register(username, phone, password);
                    window.location.href = 'index.html';
                } catch (error) {
                    FormValidation.showError(usernameInput, error.message || 'Registration failed');
                }
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
