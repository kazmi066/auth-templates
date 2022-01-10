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

const verifyAccessToken = (token) => {
    const tokenData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return new Promise((resolve, reject) => {
        if (tokenData) {
            const user = {
                id: tokenData.id,
                email: tokenData.email,
                role: tokenData.role
            }
            return resolve(user);
        } else {
            reject({ error: "Invalid token" });
        }
    })
}

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken };