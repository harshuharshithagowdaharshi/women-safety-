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
                    
                    // Remove any existing popups first
                    const existingPopups = document.querySelectorAll('.login-success-popup');
                    existingPopups.forEach(popup => popup.remove());
                    
                    // Create and show new popup
                    const popup = document.createElement('div');
                    popup.className = 'login-success-popup';
                    popup.innerHTML = `
                        <div class="popup-overlay"></div>
                        <div class="popup-content">
                            <div class="popup-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <h2 class="popup-title">Login Successful!</h2>
                            <p class="popup-message">Welcome back, <span class="username">${username.value}</span></p>
                            <div class="popup-progress">
                                <div class="progress-bar"></div>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(popup);
                    
                    // Add styles dynamically
                    const style = document.createElement('style');
                    style.textContent = `
                        .login-success-popup {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            z-index: 9999;
                            font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
                        }
                        
                        .popup-overlay {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            background: rgba(0,0,0,0.5);
                            backdrop-filter: blur(4px);
                            opacity: 0;
                            animation: fadeIn 0.3s ease-out forwards;
                        }
                        
                        .popup-content {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%) scale(0.9);
                            background: white;
                            padding: 2.5rem;
                            border-radius: 16px;
                            text-align: center;
                            max-width: 400px;
                            width: 90%;
                            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                            opacity: 0;
                            animation: fadeInUp 0.4s 0.1s ease-out forwards;
                        }
                        
                        .popup-icon {
                            width: 60px;
                            height: 60px;
                            margin: 0 auto 1.5rem;
                            background: #4BB543;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        
                        .popup-icon svg {
                            width: 30px;
                            height: 30px;
                            color: white;
                        }
                        
                        .popup-title {
                            margin: 0 0 0.5rem;
                            color: #333;
                            font-size: 1.5rem;
                            font-weight: 600;
                        }
                        
                        .popup-message {
                            margin: 0 0 1.5rem;
                            color: #666;
                            font-size: 1rem;
                            line-height: 1.5;
                        }
                        
                        .username {
                            color: #4BB543;
                            font-weight: 600;
                        }
                        
                        .popup-progress {
                            height: 4px;
                            background: #f0f0f0;
                            border-radius: 2px;
                            overflow: hidden;
                        }
                        
                        .progress-bar {
                            height: 100%;
                            width: 0;
                            background: #4BB543;
                            animation: progress 2s linear forwards;
                        }
                        
                        @keyframes fadeIn {
                            to { opacity: 1; }
                        }
                        
                        @keyframes fadeInUp {
                            to { 
                                opacity: 1;
                                transform: translate(-50%, -50%) scale(1);
                            }
                        }
                        
                        @keyframes progress {
                            to { width: 100%; }
                        }
                    `;
                    document.head.appendChild(style);
                    
                    // Redirect after 2 seconds
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                    
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
    } else {
        initRegister();
    }
});