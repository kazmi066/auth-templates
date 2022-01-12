const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const mongoConnection = () => {
  // For Creating Testing User
  // new User({ username: "john", password: "12345", role: "admin" })
  //   .save()
  //   .then(() => console.log("User created"));

  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    // Connection String
    const db = mongoose.connection;

    // Connection fail
    db.on("error", () => {
      console.error.bind(console, "connection error:");
      reject(
        "Connection error has occurred when trying to connect to the database!"
      );
    });

    // Connection pass
    db.once("open", () => {
      console.log("Database running");
      resolve("🚀 Successful database connection");
    });
  });
};

module.exports = mongoConnection;
