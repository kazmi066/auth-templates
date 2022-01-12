const User = require("../../db/model/UserModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateUserModel = ({ user }) => ({
  queries: {
    loggedInUser: async () => {
      try {
        if (user) {
          const theUser = await User.findOne({ _id: user.id });
          if (!theUser) {
            return "User not found";
          }
          return theUser;
        } else {
          console.log("Not logged In");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    getUsers: async () => {
      try {
        console.log(user);
        if (user.role === "admin") {
          const allUsers = await User.find({});
          if (!allUsers) {
            return "No Users Registered";
          }
          return allUsers;
        } else {
          console.log("Unauthorized");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  mutations: {
    registerUser: async (user) => {
      const newUser = await new User({
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
      })
        .save()
        .then((data) => {
          console.log("Data:", data);
          // return json web token
          return {
            token: jwt.sign(
              { id: data._id, email: data.email },
              process.env.JWT_SECRET,
              { expiresIn: "1y" }
            ),
            user,
          };
        })
        .catch((err) => console.log(err));
      return JSON.stringify(newUser); // return type is String
    },

    login: async (loginData) => {
      try {
        const user = await User.findOne({ username: loginData.username });
        console.log("Found user:", user);
        if (!user) throw new Error("User not found with this Nick");
        if (loginData.password !== user.password)
          throw new Error("Invalid Password");

        delete user.password;
        // return json web token
        return JSON.stringify({
          token: jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          ),
          user,
        });
      } catch (err) {
        throw new Error(err);
      }
    },
  },
});

module.exports = generateUserModel;
