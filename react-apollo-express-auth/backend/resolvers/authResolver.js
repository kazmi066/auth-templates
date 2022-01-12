const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ForbiddenError } = require("apollo-server-express");
// const { createAccessToken, createRefreshToken } = require("../helpers/tokenGenerators");

module.exports = {
  Mutation: {
    // Register Resolver
    async register(root, { name, email, password }, { models, user }) {
      try {
        const user = await models.User.findOne({ where: { email } });

        if (user) {
          throw new Error("User already registered");
        }

        const result = await models.User.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          role: "User",
        });

        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Login Resolver
    async login(root, { email, password }, { models, req, res }) {

      try {
        const user = await models.User.findOne({ where: { email: email } });

        if (!user) {
          return new Error("User not registered");
        }

        let retVal = {
          message: "Invalid username or password",
          success: false,
        };

        retVal.success = await bcrypt.compare(password, user.password);

        if (!retVal.success && password !== user.password) {
          throw new Error("Wrong password");
        }

        const access_token = createAccessToken({
          id: user.id,
          username: user.name,
          role: user.role,
          email: user.email,
        });
        const refresh_token = createRefreshToken({
          id: user.id,
          username: user.name,
          role: user.role,
          email: user.email,
        });

        res.cookie("refreshtoken", refresh_token, {
          // httpOnly: true,
          path: "/",
          secure: true,
          sameSite: "none",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
        });

        return {
          token: access_token,
          email: user.email,
          role: user.role,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // make admin Resolver
    // async makeAdmin(root, { email }, { models, user, }) {
    //   if (!user) {
    //     throw new ForbiddenError("Not authorized");
    //   }

    //   if (user.role !== "Superadmin") {
    //     throw new ForbiddenError("Not authorized, contact Super-admin");
    //   }

    //   try {
    //     const user = await models.User.findOne({ where: { email } });

    //     if (!user) {
    //       throw new Error("User not found");
    //     }

    //     if (user.role === "Admin") {
    //       throw new Error("User already an admin");
    //     }

    //     user.role = "Admin";

    //     await user.save();

    //     return user;
    //   } catch (error) {
    //     throw new Error(error.message);
    //   }
    // },


    // logout Resolver
    async logout(root, args, { res }) {
      res.clearCookie("refreshtoken");
      return {
        message: "Logged out successfully",
      };
    },

    // generate Access Token resolver from refresh token
    // async generateAccessToken(root, _, { req, res, models }) {
    //   const tokeni = req.headers["authorization"]

    //   try {
    //     const rf_token = req.cookies.refreshtoken;

    //     if (!rf_token) {
    //       throw new Error("Please Login Now");
    //     }

    //     const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET)
    //     const user = await models.User.findOne({
    //       where: { id: result.id },
    //     });

    //     if (!user) {
    //       throw new Error("This doesnt exits");
    //     }
    //     if (tokeni) {

    //       jwt.verify(tokeni, process.env.ACCESS_TOKEN, function (err, decoded) {
    //         if (err) {
    //           const access_token = createAccessToken({
    //             id: result.id,
    //             username: result.name,
    //             role: result.role,
    //             email: result.email,
    //           });

    //           return {
    //             token: access_token,
    //             email: result.email,
    //             role: result.role,
    //           }
    //         }
    //       });
    //       return {
    //         token: tokeni,
    //         email: result.email,
    //         role: result.role,
    //       }
    //     }
    //     else {
    //       const access_token = createAccessToken({
    //         id: result.id,
    //         username: result.name,
    //         role: result.role,
    //         email: result.email,
    //       });

    //       return {
    //         token: access_token,
    //         email: result.email,
    //         role: result.role,
    //       }
    //     }

    //   } catch (error) {
    //     throw new Error(error.message);
    //   }
    // },
  },
};