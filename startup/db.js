const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    //Connect to DB
    mongoose.connect('mongodb://localhost/movies', 
                     { useCreateIndex: true,
                       useNewUrlParser: true })
        .then( () => {winston.info('Connected to MongoDB...')});
}