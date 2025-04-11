const db = require('./db');

async function initDb() {
    try {

        await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        await db.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        await db.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        email_address VARCHAR(255) NOT NULL,
        appointment_date DATE NOT NULL,
        specialist_type VARCHAR(100) NOT NULL,
        preferred_time VARCHAR(100) NOT NULL,
        medical_concern TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        await db.query(`
      CREATE TABLE IF NOT EXISTS mental_health_requests (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email_address VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        support_type VARCHAR(100) NOT NULL,
        preferred_contact VARCHAR(100) NOT NULL,
        support_description TEXT NOT NULL,
        is_urgent BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        await db.query(`
      CREATE TABLE IF NOT EXISTS cyber_complaints (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email_address VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        incident_platform VARCHAR(100) NOT NULL,
        incident_date DATE NOT NULL,
        incident_description TEXT NOT NULL,
        evidence_available BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        console.log('Database tables initialized successfully');
        return true;
    } catch (err) {
        console.error('❌ Error initializing database:', err);
        return false;
    }
}

module.exports = initDb; 
