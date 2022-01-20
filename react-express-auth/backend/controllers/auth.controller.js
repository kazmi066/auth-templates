const User = require("../models/User");
const bcrypt = require("bcryptjs");
const RefreshToken = require('../models/RefreshToken');
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken, verifyAccessToken } = require("../helpers/token.helper");
const { setAccessCookie, setRefreshCookie } = require("../helpers/cookie.helper");
const catchAsync = require('../utils/catchAsync');
const { userService, authService } = require("../services");

const authController = {
    verifyMe: async (req, res) => {
        const token = req.cookies.access_token || null;
        if (!token && !req.cookies.refresh_token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            const response = await verifyAccessToken(token);
            return res.status(200).json({ user: response });
        }
        catch (err) {
            return res.status(401).json({ error: err });
        }

    },

    /**
     * 
     * @param {email} valid email 
     * @param {password} must be at least 6 characters long 
     * @returns {access_token, refresh_token}
     */

    login: catchAsync(async (req, res) => {
        const { email, password } = req.body;
        const loginData = await authService.attemptLogin(res, email, password);
        return res.status(200).json(loginData);
    }),

    /**
     * 
     * @param {name} name of the user
     * @param {email} valid email
     * @param {password} must be at least 6 characters long
     * @returns {message} user created successfully
     */

    register: catchAsync(async (req, res) => {
        const user = await userService.createUser(req.body);
        res.status(201).json({ message: "User created successfully" })
    }),

    logout: (req, res) => {
        const access_token = req.cookies.access_token;

        if (!access_token) {
            return res.status(400).json({ error: "Not logged in" });
        }

        jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Not logged in' });
            }

            RefreshToken.findOneAndDelete({ user: decoded.id }, (err, refreshToken) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }

                res.clearCookie("access_token");
                res.clearCookie("refresh_token");

                return res.status(200).json({
                    message: "Logged out successfully"
                })
            })
        })
    },
    generateAccessToken: async (req, res) => {
        const { refresh_token } = req.cookies;

        const refToken = await RefreshToken.findOne({ token: refresh_token })

        if (!refToken) {
            return res.status(403).json({ error: "Invalid token, Login Again" });
        }

        const user = {
            _id: refToken.user,
            email: refToken.email,
            role: refToken.role,
        }

        // Replace old refresh token with a new one and save
        const newRefreshToken = generateRefreshToken(user);
        await newRefreshToken.save();

        // generate new access token
        const { access_token } = await generateAccessToken(user);

        setAccessCookie(res, access_token);
        setRefreshCookie(res, newRefreshToken.token);

        // Also remove the old refresh token
        await RefreshToken.deleteOne({ _id: refToken._id });

        return res.status(200).json({
            access_token,
            refresh_token: newRefreshToken.token,
        })

    }
}

module.exports = authController;