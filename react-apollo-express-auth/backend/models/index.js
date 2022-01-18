const mongoose = require('mongoose');
const User = require('./User.model');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, (err) => {
  if (err) {
    console.log("Error connecting to Database ", err);
  } else {
    console.log('Database Connected');
  }
})

const models = { User };
module.exports = models;