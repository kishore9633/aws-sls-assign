const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

var userschema = new Schema({
    user_name: {
        type: String,
        required: true,
    },
    user_mobilenumber: {
        type: Number,
        required: true
    },
    createdon: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('users', userschema);