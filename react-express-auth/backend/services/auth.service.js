const { generateAccessToken, generateRefreshToken } = require("../helpers/token.helper");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const { setAccessCookie, setRefreshCookie } = require('../helpers/cookie.helper');
const { userService } = require(".");

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

module.exports = {
    attemptLogin
}