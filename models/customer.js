const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    isGold : {
        type : Boolean,
        default : false
    }
});

const Customer = mongoose.model('customer', customerSchema);

function validateCustomer(cust){
    const Schema = {
        name : Joi.string().min(5).required(),
        phone : Joi.string().min(8).required(),
        isGold : Joi.boolean()
    }
    return Joi.validate(cust, Schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;