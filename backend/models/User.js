const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;