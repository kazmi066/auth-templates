const RefreshToken = require('../models/RefreshToken');
const { generateAccessToken, generateRefreshToken, verifyAccessToken } = require("../helpers/token.helper");
const catchAsync = require('../utils/catchAsync');
const { userService, authService } = require("../services");
const ApiError = require("../utils/ApiError");

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
     * @returns {user, access_token, refresh_token}
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
        return res.status(200).json({ message: "User created successfully" })
    }),

    /**
     * 
     * @param {access_token} valid access_token
     * @returns {message} user logged out successfully
    */

    logout: catchAsync(async (req, res) => {
        const token = req.cookies.access_token;
        if (!token) throw new ApiError(401, "Invalid Token, Please login again");
        await authService.logout(res, token);
        return res.status(200).json({ message: 'Logged out successfully' });
    }),

    /**
     * 
     * @param {refresh_token} valid refresh_token
     * @returns {access_token, refresh_token}
    */
    generateAccessToken: catchAsync(async (req, res) => {
        const { refresh_token } = req.cookies;
        const refToken = await RefreshToken.findOne({ token: refresh_token })
        if (!refToken) throw new ApiError(400, "Invalid Token, Please login again");
        const { access_token, refresh_token: latestRefreshToken } = await authService.generateNewAccessToken(res, refToken);
        return res.status(200).json({ access_token, refresh_token: latestRefreshToken });
    })
}

module.exports = authController;