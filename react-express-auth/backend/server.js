const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const { verifyToken } = require('./middlewares/verifyToken');
const helmet = require('helmet');
const xss = require('xss-clean');

require('dotenv').config();         // Load .env file
require('./database/connection');   // Database connection

// Body parser
app.use(express.json());

// Set Security HTTP Headers
app.use(helmet())

// Sanitize incoming data
app.use(xss());

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/auth.route'));
app.get('/api/cookies', verifyToken, (req, res) => {
    res.send(req.cookies);
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})
