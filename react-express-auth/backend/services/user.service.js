const bcrypt = require("bcryptjs");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const createUser = async (reqBody) => {
    const isEmailExists = await User.isEmailExists(reqBody.email);
    if (isEmailExists) throw new ApiError(401, "Email already exists");
    const { password } = reqBody;
    const hashedPassword = bcrypt.hashSync(password, 10);
    return User.create({ ...reqBody, password: hashedPassword });
}

const getUserByEmail = async (email) => {
    return User.findOne({ email });
}

const comparePassword = (password, userPassword) => {
    const passwordCheck = bcrypt.compareSync(password, userPassword);
    if (!passwordCheck) throw new ApiError(401, "Invalid password");
    return true;
}

module.exports = {
    createUser,
    getUserByEmail,
    comparePassword
}