const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();
const {Genre, validate} = require('../models/genres');



router.get('/', async (req, res, next) => {
    const genres = await Genre.find().sort('name');
    res.send(genres); 
    
});


router.post('/', auth, async (req,res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let genre = new Genre ({
        name : req.body.name
    });
    genre = await genre.save();
    
    res.send(genre);
});


router.put('/:id', auth, async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findOneAndUpdate(req.params.id, {name : req.body.name}, {new : true});
    
    if(!genre) return res.status(404).send('Not found !');
    
    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  
if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req,res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('Not found !');
    res.send(genre); 
});


module.exports = router;
