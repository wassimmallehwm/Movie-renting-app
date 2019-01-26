const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const router = express.Router();
const {Customer, validate} = require('../models/customer');

router.get('/', async (req, res) => {
   const customers = await Customer.find();
    res.send(customers);
});

router.post('/', auth, async (req, res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
   let customer = new Customer({
        name : req.body.name,
       phone : req.body.phone,
       isGold : req.body.isGold
    });
    
    customer = await customer.save();
    res.send(customer);
});


router.put('/:id', auth, async (req, res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findOneAndUpdate(req.params.id, {
        name : req.body.name,
       phone : req.body.phone,
       isGold : req.body.isGold
    }, {new : true});
    if(!customer) res.status(404).send('Not Found !');
    res.send(customer);
});


router.delete('/:id', async (req, res) => {
    const customer = await Customer.findOneAndDelete(req.params.id);
    if(!customer) res.status(404).send('Not Found !');
    res.send(customer);
});


router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) res.status(404).send('Not Found !');
    res.send(customer);
});



module.exports = router;