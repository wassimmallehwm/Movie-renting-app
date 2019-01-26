const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const _ = require('lodash');
const router = express.Router();
const {User} = require('../models/users');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Invalid email or password !');
    
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid email or password !');
    
    const token = user.generateAuthToken();
    res.send(token);
});







function validate(req){
    const Schema = {
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, Schema);
}


module.exports = router;