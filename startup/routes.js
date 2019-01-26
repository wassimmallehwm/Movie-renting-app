const express = require('express');
const genres = require('../routes/genres');
const customer = require('../routes/customer');
const rental = require('../routes/rental');
const movie = require('../routes/movie');
const user = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customer);
    app.use('/api/movies', movie);
    app.use('/api/rentals', rental);
    app.use('/api/users', user);
    app.use('/api/auth', auth);
    app.use(error);
}