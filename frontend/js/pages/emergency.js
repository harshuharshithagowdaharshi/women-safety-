document.addEventListener('DOMContentLoaded', function () {
    initEmergencyButtons();
});

function initEmergencyButtons() {
    const emergencyButtons = document.querySelectorAll('.emergency-button');

    emergencyButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const buttonType = this.classList.contains('call-only') ? 'call' :
                this.classList.contains('call-location') ? 'call-location' :
                    'call-location-family';

            let message = '';

            switch (buttonType) {
                case 'call':
                    message = 'Emergency call initiated.';
                    break;
                case 'call-location':
                    message = 'Emergency call initiated and location shared.';
                    break;
                case 'call-location-family':
                    message = 'Emergency call initiated, location shared, and family members notified.';
                    break;
            }

            alert(message);
        });
    });

    emergencyButtons.forEach(button => {
        button.addEventListener('touchstart', function () {
            this.classList.add('hover');
        });

        button.addEventListener('touchend', function () {
            this.classList.remove('hover');
        });
    });
} 