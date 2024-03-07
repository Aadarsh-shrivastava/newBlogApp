const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Text = require('../model/message.model.js');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] 
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });
    return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label("Fisrt-Name"),
        lastName: joi.string().required().label("Last-Name"),
        email: joi.string().email().required().label("E-mail"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
};

module.exports = { User, validate };
