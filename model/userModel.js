const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email!']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!']
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    //Has the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    //Delete password confirm field.
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

const User = mongoose.model('User', userSchema); 

module.exports = User;