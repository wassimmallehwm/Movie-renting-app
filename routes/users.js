const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const router = express.Router();
const {User, validate} = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
   const users = await User.find();
    res.send(users);
});

router.post('/', auth, async (req, res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email : req.body.email});
    if(user) return res.status(400).send('User already registred !');
    
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    await user.save();
    
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
});


router.put('/:id', auth, async (req, res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findOneAndUpdate(req.params.id, {
        name : req.body.name,
       email : req.body.email,
       password : req.body.password
    }, {new : true});
    if(!user) res.status(404).send('Not Found !');
    res.send(user);
});


router.delete('/:id', async (req, res) => {
    const user = await User.findOneAndDelete(req.params.id);
    if(!user) res.status(404).send('Not Found !');
    res.send(user);
});


router.get('/me', auth, async (req, res) => {
    const user = await User
    .findById(req.user._id)
    .select('-password');
    res.send(user);
});

router.get('/:id', auth, async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) res.status(404).send('Not Found !');
    res.send(user);
});



module.exports = router;