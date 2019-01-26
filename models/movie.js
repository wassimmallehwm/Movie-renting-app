const Joi = require('joi');
const mongoose = require('mongoose');
const {genres} = require('./genres');

const movieSchema = new mongoose.Schema({
   title : {
       type : String,
       required : true,
       trim : true,
       minlength : 5,
       maxlength : 100
   },
    genre : {
        type : genres,
        required : true
    },
    numberInStock : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    }
});

const Movie = mongoose.model('movie', movieSchema);

function validateMovie(mov){
    const Schema = {
        title : Joi.string().min(5).required(),
        genreId : Joi.objectId().required(),
        numberInStock : Joi.number().min(0).required(),
        dailyRentalRate : Joi.number().min(0).required(),
    }
    return Joi.validate(mov, Schema);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;