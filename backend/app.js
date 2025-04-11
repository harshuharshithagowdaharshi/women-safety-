const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const initDb = require('./config/initDb');

const app = express();
const PORT = process.env.PORT;

app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization', 'Accept']
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/forms'));

app.get('/', (req, res) => res.json({ message: 'Women Safety API' }));

app.use((err, req, res) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({ message: 'Server error' });
});

const startServer = async () => {
    try {
        const dbInitialized = await initDb();
        if (dbInitialized) {
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        } else {
            console.error('❌ Failed to initialize database. Server not started.');
            process.exit(1);
        }
    } catch (err) {
        console.error('❌ Server startup error:', err);
        process.exit(1);
    }
};

startServer();
module.exports = app;
