const mongoose = require('mongoose');
const schema = mongoose.Schema;

const RefreshTokenSchema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    token: String,
    expires: Date,
})

RefreshTokenSchema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
})


const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
module.exports = RefreshToken;