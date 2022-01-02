const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const { verifyToken } = require('./middlewares/verifyToken');

require('dotenv').config();         // Load .env file
require('./database/connection');   // Database connection

// Middlewares
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/auth.route'));
app.get('/cookies', verifyToken, (req, res) => {
    res.send(req.cookies);

})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})
