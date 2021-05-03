const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'An user must have a username']
    },
    role: {
        type: String,
        enum: ['user', 'admin','company'],
        default: 'user'
    },

    password: {
        type: String,
        required: [true, 'An user must have a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Confirm the password'],
        minlength: 8,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password are not the same!'
        },
        select: false
    }

});

usersSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    else {
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordConfirm = undefined;
        next();
    }
})

usersSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}


module.exports = mongoose.model('User', usersSchema);