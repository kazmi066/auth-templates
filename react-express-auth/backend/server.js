const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const app = express();

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

// Cookie parser
app.use(cookieParser());

// Routes
app.use('/api/v1', require('./routes'));

app.use((err, req, res, next) => {
    let { statusCode, message } = err;
    if (!statusCode)
        statusCode = 500;
    const response = { message }
    res.status(statusCode).send(response);
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})
