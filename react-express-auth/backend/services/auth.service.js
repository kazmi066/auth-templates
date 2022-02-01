const { generateAccessToken, generateRefreshToken } = require("../helpers/token.helper");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const { setAccessCookie, setRefreshCookie } = require('../helpers/cookie.helper');
const { userService } = require(".");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

const attemptLogin = async (res, email, password) => {
    const emailExists = await User.isEmailExists(email);
    if (!emailExists) throw new ApiError(404, "User not found");

    const user = await userService.getUserByEmail(email);
    userService.comparePassword(password, user.password);

    const access_token = await generateAccessToken(user);
    const refresh_token = await generateRefreshToken(user);

    setAccessCookie(res, access_token);
    setRefreshCookie(res, refresh_token.token);

    await refresh_token.save();
    const responseUser = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
    }

    return {
        user: responseUser,
        access_token,
        refresh_token: refresh_token.token
    };
}

const logout = async (res, access_token) => {
    return jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) throw new ApiError(401, "Invalid Token, Please login again");
        await RefreshToken.findOneAndDelete({ user: decoded.id });
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
    })
}

const generateNewAccessToken = async (res, refToken) => {
    const user = {
        _id: refToken.user,
        email: refToken.email,
        role: refToken.role,
    }

    // Replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(user);
    await newRefreshToken.save();

    // generate new access token
    const access_token = await generateAccessToken(user);

    setAccessCookie(res, access_token);
    setRefreshCookie(res, newRefreshToken.token);

    // Also remove the old refresh token
    await RefreshToken.deleteOne({ _id: refToken._id });

    return { access_token, refresh_token: newRefreshToken.token }
}


module.exports = {
    attemptLogin,
    logout,
    generateNewAccessToken
}