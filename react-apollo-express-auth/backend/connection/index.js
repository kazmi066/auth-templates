const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) {
    console.log("Error connecting to Database ", err);
  } else {
    console.log('Database Connected');
  }
})

module.exports = mongoose;