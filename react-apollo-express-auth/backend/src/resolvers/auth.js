import {UserInputError, AuthenticationError} from 'apollo-server-express';
import jwt from "jsonwebtoken";

const createToken = (user, secret, expiresIn) => {
  const { id, username, email, role } = user;
  return jwt.sign({ id, username, email, role }, secret, {
    expiresIn: expiresIn
  });
}

export default {
  Mutation: {
      // Register User Resolver
      async signUp(parent, { username, email, password }, { models }) {
        try {
          const user = await models.User.findByEmail(email);

          if (user) {
            throw new UserInputError("User already registered with these credentials");
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

        const token = createToken(user, process.env.JWT_SECRET, '30h');

        res.cookie('token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 30,     // 30 days
        })

        return { token };

      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Logout Resolver
    async logout(parent, args, { res }) {
      res.cookie('token', "", {
        maxAge: -1,
      });
      return {
        message: "Logged out successfully",
      };
    },
  }
};