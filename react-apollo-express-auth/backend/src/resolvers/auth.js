import {UserInputError, AuthenticationError} from 'apollo-server-express';
import jwt from "jsonwebtoken"

export default {
  Query: {
    // logout Resolver
    async logout(parent, args, { res }) {
      // res.clearCookie("refreshtoken");
      return {
        message: "Logged out successfully",
      };
    },
  } , 
  
  Mutation: {
      // Register User Resolver
      async signUp(parent, { username, email, password }, { models }) {
        try {
          const user = await models.User.findByEmail(email);

          if (user) {
            throw new Error("User already registered");
          }

          await models.User.create({
            username,
            email,
            password,
            role: "user",
          });

          return {
            message: 'User registered successfully',
          };

        } catch (error) {
          throw new Error(error.message);
        }
    },

    // Signin Resolver
    async signIn(parent, { email, password }, { models, req, res }) {
      try {
        const user = await models.User.findByEmail(email);

        if (!user) {
          return new UserInputError("User not registered");
        }

        const isValidPassword = await user.validatePassword(password);

        if (!isValidPassword) {
          throw new AuthenticationError('Invalid password.');
        }

        const token = jwt.sign({ 
          id: user._id, 
          email: user.email, 
          username: user.username, 
          role: user.role 
         }, process.env.JWT_SECRET, {
          expiresIn: '1h'
         })

        return { token };

      } catch (error) {
        throw new Error(error.message);
      }
    },

  }
};