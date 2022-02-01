const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const RefreshToken = require('../models/RefreshToken');

const generateAccessToken = async (user) => {
    const access_token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: String(process.env.ACCESS_TOKEN_EXPIRES)
    });

    return new Promise((resolve, reject) => {
        if (access_token) {
            resolve(access_token);
        }
        reject({ error: "Error generating tokens" });
    })
}

const generateRefreshToken = (user) => {
    return new RefreshToken({
        user: user._id,
        email: user.email,
        role: user.role,
        token: crypto.randomBytes(40).toString('hex'),
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),      // 7 days
    })
}

module.exports = { generateAccessToken, generateRefreshToken };