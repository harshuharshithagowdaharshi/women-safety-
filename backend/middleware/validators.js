const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const registerValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('phone').notEmpty().matches(/^\d{10}$/).withMessage('Valid phone number is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    handleValidationErrors
];

const loginValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
];

const contactValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('phone').notEmpty().matches(/^\d{10}$/).withMessage('Valid phone number is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').notEmpty().withMessage('Message is required'),
    handleValidationErrors
];

const appointmentValidation = [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('phoneNumber').notEmpty().matches(/^\d{10}$/).withMessage('Valid phone number is required'),
    body('emailAddress').isEmail().withMessage('Valid email is required'),
    body('appointmentDate').notEmpty().withMessage('Appointment date is required'),
    body('specialistType').notEmpty().withMessage('Specialist type is required'),
    body('preferredTime').notEmpty().withMessage('Preferred time is required'),
    handleValidationErrors
];

const mentalHealthValidation = [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('emailAddress').isEmail().withMessage('Valid email is required'),
    body('phoneNumber').notEmpty().matches(/^\d{10}$/).withMessage('Valid phone number is required'),
    body('supportType').notEmpty().withMessage('Support type is required'),
    body('preferredContact').notEmpty().withMessage('Preferred contact method is required'),
    body('supportDescription').notEmpty().withMessage('Support description is required'),
    handleValidationErrors
];

const cyberComplaintValidation = [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('emailAddress').isEmail().withMessage('Valid email is required'),
    body('phoneNumber').notEmpty().matches(/^\d{10}$/).withMessage('Valid phone number is required'),
    body('incidentPlatform').notEmpty().withMessage('Incident platform is required'),
    body('incidentDate').notEmpty().withMessage('Incident date is required'),
    body('incidentDescription').notEmpty().withMessage('Incident description is required'),
    handleValidationErrors
];

module.exports = {
    registerValidation,
    loginValidation,
    contactValidation,
    appointmentValidation,
    mentalHealthValidation,
    cyberComplaintValidation
}; 