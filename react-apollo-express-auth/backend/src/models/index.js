import mongoose from 'mongoose';
import User from './User.model.js';
import Message from './Message.model.js';

const connectDB = () => {
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

}

const models = { User, Message };
export {connectDB} ;

export default models;