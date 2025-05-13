document.addEventListener('DOMContentLoaded', function () {
    initHarassmentForm();
});

function initHarassmentForm() {
    const harassmentForm = document.getElementById('harassmentForm');
    if (!harassmentForm) return;

    const formFields = harassmentForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('input', function () {
            FormValidation.clearError(this.id);
        });
    });

    harassmentForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (validateHarassmentForm()) {
            try {
                if (!window.api.isLoggedIn()) {
                    alert('Please log in to submit the cyber harassment complaint');
                    window.location.href = 'login.html';
                    return;
                }

                const data = {
                    fullName: document.getElementById('fullName').value,
                    emailAddress: document.getElementById('emailAddress').value,
                    phoneNumber: document.getElementById('phoneNumber').value,
                    incidentPlatform: document.getElementById('incidentPlatform').value,
                    incidentDate: document.getElementById('incidentDate').value,
                    incidentDescription: document.getElementById('incidentDescription').value,
                    evidenceAvailable: document.getElementById('evidenceAvailable')?.checked || false
                };

                await window.api.request("/cyber", "POST", data);

                const popup = document.createElement("div");
                popup.className = "complaint-success-popup";
                popup.innerHTML = `
                    <div class="popup-overlay"></div>
                    <div class="popup-content">
                        <div class="popup-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h2 class="popup-title">Complaint Submitted!</h2>
                        <p class="popup-message">A representative will contact you shortly to follow up.</p>
                        <div class="popup-progress">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                `;
                document.body.appendChild(popup);

                if (!document.getElementById("complaint-popup-style")) {
                    const style = document.createElement("style");
                    style.id = "complaint-popup-style";
                    style.textContent = `
                        .complaint-success-popup {
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
                }

                harassmentForm.reset();

                setTimeout(() => {
                    popup.remove();
                }, 2500);
            } catch (error) {
                console.error("Form submission failed:", error);
                alert("An error occurred while submitting the complaint. Please try again.");
            }
        }
    });
}

function validateHarassmentForm() {
    let isValid = true;

    const requiredFields = [
        'fullName',
        'emailAddress',
        'phoneNumber',
        'incidentPlatform',
        'incidentDate',
        'incidentDescription'
    ];

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!FormValidation.validateRequired(field.value.trim())) {
            FormValidation.showError(fieldId, 'This field is required');
            isValid = false;
        }
    });

    const emailField = document.getElementById('emailAddress');
    if (emailField.value.trim() && !FormValidation.validateEmail(emailField.value.trim())) {
        FormValidation.showError('emailAddress', 'Please enter a valid email address');
        isValid = false;
    }

    const phoneField = document.getElementById('phoneNumber');
    if (phoneField.value.trim() && !FormValidation.validatePhone(phoneField.value.trim())) {
        FormValidation.showError('phoneNumber', 'Please enter a valid phone number');
        isValid = false;
    }

    const dateField = document.getElementById('incidentDate');
    if (dateField.value) {
        const selectedDate = new Date(dateField.value);
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            FormValidation.showError('incidentDate', 'Date cannot be in the future');
            isValid = false;
        }
    }

    return isValid;
}
