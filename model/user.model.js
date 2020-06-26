// Libraries
const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
let UserSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    userName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

UserSchema.methods.comparePassword = function (pass) {
    return bcrypt.compareSync(pass, this.pass);
}

module.exports = mongoose.model('User', UserSchema, 'User');