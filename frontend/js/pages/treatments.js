document.addEventListener('DOMContentLoaded', function () {
    initAppointmentForm();
});

function initAppointmentForm() {
    const appointmentForm = document.getElementById('appointmentForm');
    if (!appointmentForm) return;

    const formFields = appointmentForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('input', function () {
            FormValidation.clearError(this.id);
        });
    });

    appointmentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateAppointmentForm()) {
            alert('Your appointment request has been submitted. We will contact you shortly to confirm.');
            appointmentForm.reset();
        }
    });
}

function validateAppointmentForm() {
    let isValid = true;

    const requiredFields = [
        'fullName',
        'phoneNumber',
        'emailAddress',
        'appointmentDate',
        'specialistType',
        'preferredTime'
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

    const dateField = document.getElementById('appointmentDate');
    if (dateField.value && !FormValidation.validateFutureDate(dateField.value)) {
        FormValidation.showError('appointmentDate', 'Please select a future date');
        isValid = false;
    }

    return isValid;
} 