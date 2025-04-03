document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        nameInput.addEventListener('input', () => FormValidation.clearError(nameInput));
        phoneInput.addEventListener('input', () => FormValidation.clearError(phoneInput));
        emailInput.addEventListener('input', () => FormValidation.clearError(emailInput));
        messageInput.addEventListener('input', () => FormValidation.clearError(messageInput));

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            if (!FormValidation.validateRequired(nameInput.value)) {
                FormValidation.showError(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                FormValidation.clearError(nameInput);
            }

            if (!FormValidation.validateRequired(phoneInput.value)) {
                FormValidation.showError(phoneInput, 'Please enter your phone number');
                isValid = false;
            } else {
                FormValidation.clearError(phoneInput);
            }

            if (!FormValidation.validateEmail(emailInput.value)) {
                FormValidation.showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                FormValidation.clearError(emailInput);
            }

            if (!FormValidation.validateRequired(messageInput.value)) {
                FormValidation.showError(messageInput, 'Please enter your message');
                isValid = false;
            } else {
                FormValidation.clearError(messageInput);
            }

            if (isValid) {
                alert('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            }
        });
    }
} 