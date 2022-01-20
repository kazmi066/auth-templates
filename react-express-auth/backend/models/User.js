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
        enum: ['admin', 'user'],
        default: 'user'
    }
})

userSchema.statics.isEmailExists = async function (email) {
    const user = await this.findOne({ email });
    if (user) return true;
    return false;
}

const User = mongoose.model('User', userSchema);
module.exports = User;