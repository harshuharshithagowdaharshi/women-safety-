document.addEventListener('DOMContentLoaded', function () {
    initMentalHealthForm();
});

function initMentalHealthForm() {
    const mentalHealthForm = document.getElementById('mentalHealthForm');
    if (!mentalHealthForm) return;

    const formFields = mentalHealthForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('input', function () {
            FormValidation.clearError(this.id);
        });
    });

    mentalHealthForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateMentalHealthForm()) {
            alert('Your mental health support request has been submitted. A professional will contact you soon.');
            mentalHealthForm.reset();
        }
    });
}

function validateMentalHealthForm() {
    let isValid = true;

    const requiredFields = [
        'fullName',
        'emailAddress',
        'phoneNumber',
        'supportType',
        'preferredContact',
        'supportDescription'
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

    return isValid;
}
