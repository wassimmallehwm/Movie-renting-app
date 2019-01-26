const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genres');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
   const movies = await Movie.find();
    res.send(movies);
});

router.post('/', auth, async (req, res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Invalide Genre');
    
   let movie = new Movie({
       title : req.body.title,
       genre : {
           _id : genre._id,
           name : genre.name
       },
       numberInStock : req.body.numberInStock,
       dailyRentalRate : req.body.dailyRentalRate
    });
    
    movie = await movie.save();
    res.send(movie);
});


router.put('/:id', auth, async (req, res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Invalide Genre');
    
    const movie = await Movie.findOneAndUpdate(req.params.id, {
       title : req.body.title,
       genre : {
           _id : genre._id,
           name : genre.name
       },
       numberInStock : req.body.numberInStock,
       dailyRentalRate : req.body.dailyRentalRate
    }, {new : true});
    if(!movie) res.status(404).send('Not Found !');
    res.send(movie);
});


router.delete('/:id', async (req, res) => {
    const movie = await Movie.findOneAndDelete(req.params.id);
    if(!movie) res.status(404).send('Not Found !');
    res.send(movie);
});


router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) res.status(404).send('Not Found !');
    res.send(movie);
});



module.exports = router;