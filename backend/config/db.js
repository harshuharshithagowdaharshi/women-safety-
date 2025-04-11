const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Log only once at startup, not on every query
let hasConnected = false;
pool.on('connect', () => {
    if (!hasConnected) {
        console.log('Database connection pool established');
        hasConnected = true;
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}; 