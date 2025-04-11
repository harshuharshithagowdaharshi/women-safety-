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

                await window.api.request('/cyber', 'POST', data);
                alert('Your complaint has been submitted. A representative will contact you shortly to follow up.');
                harassmentForm.reset();
            } catch (error) {
                alert(error.message || 'Failed to submit your complaint. Please try again later.');
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
