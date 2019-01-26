const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minlength : 5,
        maxlength : 255
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 1024
    },
    isAdmin : Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ 
        _id : this._id, 
        isAdmin : this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('user', userSchema);

function validateUser(u){
    const Schema = {
        name : Joi.string().min(5).max(100).required(),
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(255).required()
    }
    return Joi.validate(u, Schema);
}

module.exports.User = User;
module.exports.validate = validateUser;