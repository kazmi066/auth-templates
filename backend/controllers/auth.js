const User = require("../models/user");
const bcrypt = require("bcryptjs");
const RefreshToken = require('../models/RefreshToken');
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../helpers/generateTokens");
const setCookie = require("../helpers/cookieHandler");

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "User not found, Please register" });
            }

            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid password" });
            }

            const { access_token } = await generateAccessToken(user);
            const refresh_token = generateRefreshToken(user);

            setCookie(res, access_token);

            await refresh_token.save();

            res.status(200).json({
                access_token,
                refresh_token: refresh_token.token,
            })

        } catch (err) {
            res.status(500).json({ error: err.message });
        }


    },
    register: async (req, res) => {
        const { fullname, email, password } = req.body;

        const alreadyExists = await User.findOne({ email });

        if (alreadyExists) {
            return res.status(400).send({ error: "User already exists" });
        }

        const user = new User({
            fullname,
            email,
            password: bcrypt.hashSync(password, 10),
            role: 'user'
        })

        try {
            await user.save();
            return res.status(200).json({
                message: "User created successfully"
            })
        } catch (err) {
            res.status(400).json({
                error: err
            });
        }

    },
    logout: (req, res) => {
        const access_token = req.cookies.access_token;

        if (!access_token) {
            res.status(400).json({ error: "Not logged in" });
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

                return res.status(200).json({
                    message: "Logged out successfully"
                })
            })
        })
    },
    generateAccessToken: async (req, res) => {
        const { refresh_token } = req.body;

        const refToken = await RefreshToken.findOne({ token: refresh_token })

        if (!refToken) {
            return res.status(403).json({ error: "Invalid token, Login Again" });
        }

        const { user } = refToken;

        // Replace old refresh token with a new one and save
        const newRefreshToken = generateRefreshToken(user);
        await newRefreshToken.save();

        // generate new access token
        const { access_token } = await generateAccessToken(user);

        setCookie(res, access_token);

        // Also remove the old refresh token
        await RefreshToken.deleteOne({ _id: refToken._id });

        return res.status(200).json({
            access_token,
            refresh_token: newRefreshToken.token,
        })

    }
}

module.exports = authController;