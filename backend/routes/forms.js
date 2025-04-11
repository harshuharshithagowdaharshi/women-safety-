const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const auth = require('../middleware/auth');
const {
    contactValidation,
    appointmentValidation,
    mentalHealthValidation,
    cyberComplaintValidation
} = require('../middleware/validators');

router.post('/contact', auth, contactValidation, formController.submitContact);
router.post('/appointments', auth, appointmentValidation, formController.submitAppointment);
router.post('/mental-health', auth, mentalHealthValidation, formController.submitMentalHealthRequest);
router.post('/cyber', auth, cyberComplaintValidation, formController.submitCyberComplaint);

module.exports = router; 