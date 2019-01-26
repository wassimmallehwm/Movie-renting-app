const Joi = require('joi');
const mongoose = require('mongoose');


const genresSchema = new mongoose.Schema({
   name: {
       type : String,
       required : true,
       minlength : 5,
       maxlength : 50
   } 
});

const Genre = mongoose.model('Genre', genresSchema);

function validateGenre(gen){
    const Schema = {
        name : Joi.string().min(5).required()
    }
    return Joi.validate(gen, Schema);
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
module.exports.genres = genresSchema;