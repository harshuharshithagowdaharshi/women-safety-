const db = require('../config/db');

exports.submitContact = async (req, res) => {
    const { name, phone, email, message } = req.body;

    try {
        await db.query(
            'INSERT INTO contact_messages (name, phone, email, message) VALUES ($1, $2, $3, $4)',
            [name, phone, email, message]
        );

        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.submitAppointment = async (req, res) => {
    const {
        fullName,
        phoneNumber,
        emailAddress,
        appointmentDate,
        specialistType,
        preferredTime,
        medicalConcern
    } = req.body;

    try {
        await db.query(
            'INSERT INTO appointments (full_name, phone_number, email_address, appointment_date, specialist_type, preferred_time, medical_concern) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [fullName, phoneNumber, emailAddress, appointmentDate, specialistType, preferredTime, medicalConcern]
        );

        res.status(201).json({ message: 'Appointment request submitted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.submitMentalHealthRequest = async (req, res) => {
    const {
        fullName,
        emailAddress,
        phoneNumber,
        supportType,
        preferredContact,
        supportDescription,
        isUrgent
    } = req.body;

    try {
        await db.query(
            'INSERT INTO mental_health_requests (full_name, email_address, phone_number, support_type, preferred_contact, support_description, is_urgent) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [fullName, emailAddress, phoneNumber, supportType, preferredContact, supportDescription, isUrgent || false]
        );

        res.status(201).json({ message: 'Mental health support request submitted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.submitCyberComplaint = async (req, res) => {
    const {
        fullName,
        emailAddress,
        phoneNumber,
        incidentPlatform,
        incidentDate,
        incidentDescription,
        evidenceAvailable
    } = req.body;

    try {
        await db.query(
            'INSERT INTO cyber_complaints (full_name, email_address, phone_number, incident_platform, incident_date, incident_description, evidence_available) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [fullName, emailAddress, phoneNumber, incidentPlatform, incidentDate, incidentDescription, evidenceAvailable || false]
        );

        res.status(201).json({ message: 'Cyber harassment complaint submitted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
}; 