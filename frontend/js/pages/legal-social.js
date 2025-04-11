document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionalities
    initMentalHealthForm();
    initNGOFilter();
    initPopupCloseHandlers();
});

/* ===================== MENTAL HEALTH FORM ===================== */
function initMentalHealthForm() {
    const mentalHealthForm = document.getElementById('mentalHealthForm');
    if (!mentalHealthForm) return;

    // Clear errors on input
    const formFields = mentalHealthForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            FormValidation.clearError(this.id);
        });
    });

    // Form submission
    mentalHealthForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (validateMentalHealthForm()) {
            try {
                if (!window.api.isLoggedIn()) {
                    alert('Please log in to submit the mental health support request');
                    window.location.href = 'login.html';
                    return;
                }

                const data = {
                    fullName: document.getElementById('fullName').value,
                    emailAddress: document.getElementById('emailAddress').value,
                    phoneNumber: document.getElementById('phoneNumber').value,
                    supportType: document.getElementById('supportType').value,
                    preferredContact: document.getElementById('preferredContact').value,
                    supportDescription: document.getElementById('supportDescription').value,
                    isUrgent: document.getElementById('urgentSupport')?.checked || false
                };

                // Submit to backend
                await window.api.request('/mental-health', 'POST', data);
                
                // Show Zoom call popup instead of alert
                showZoomPopup();
                mentalHealthForm.reset();

            } catch (error) {
                alert(error.message || 'Failed to submit your support request. Please try again later.');
            }
        }
    });
}

function validateMentalHealthForm() {
    let isValid = true;
    const requiredFields = [
        'fullName', 'emailAddress', 'phoneNumber', 
        'supportType', 'preferredContact', 'supportDescription'
    ];

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!FormValidation.validateRequired(field.value.trim())) {
            FormValidation.showError(fieldId, 'This field is required');
            isValid = false;
        }
    });

    // Email validation
    const emailField = document.getElementById('emailAddress');
    if (emailField.value.trim() && !FormValidation.validateEmail(emailField.value.trim())) {
        FormValidation.showError('emailAddress', 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    const phoneField = document.getElementById('phoneNumber');
    if (phoneField.value.trim() && !FormValidation.validatePhone(phoneField.value.trim())) {
        FormValidation.showError('phoneNumber', 'Please enter a valid phone number');
        isValid = false;
    }

    return isValid;
}

/* ===================== ZOOM CALL POPUP ===================== */
function showZoomPopup() {
    const popup = document.getElementById('confirmationPopup');
    if (popup) {
        popup.style.display = 'flex';
        
        // Auto-close after 10 seconds (optional)
        setTimeout(() => {
            popup.style.display = 'none';
        }, 10000);
    }
}

function initPopupCloseHandlers() {
    const popup = document.getElementById('confirmationPopup');
    if (!popup) return;

    // Close buttons
    document.querySelectorAll('.btn-popup-close, .close-popup').forEach(btn => {
        btn.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    });

    // Close when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.style.display === 'flex') {
            popup.style.display = 'none';
        }
    });
}

/* ===================== NGO FILTER ===================== */
function initNGOFilter() {
    const categoryButtons = document.querySelectorAll('.ngo-categories button');
    const ngoCards = document.querySelectorAll('.ngo-card');
    
    if (!categoryButtons.length || !ngoCards.length) return;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter NGOs
            const category = button.dataset.category;
            ngoCards.forEach(card => {
                card.style.display = (category === 'all' || card.dataset.category === category) 
                    ? 'block' 
                    : 'none';
            });
            
            // Smooth scroll to results
            document.querySelector('.ngo-grid').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        });
    });
}