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
            resolve({ access_token });
        }
        reject({ error: "Error generating tokens" });
    })
}

const generateRefreshToken = (user) => {
    return new RefreshToken({
        user: user._id,
        token: crypto.randomBytes(40).toString('hex'),
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),      // 7 days
    })

}

const verifyValidToken = async (token) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw new Error("Invalid token");
        }
        const user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        }
        return user;
    })
}

module.exports = { generateAccessToken, generateRefreshToken, verifyValidToken };