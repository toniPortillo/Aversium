'use strict';

const mongoose = require('../../config/mongoose/dbAversium');
const Schema = mongoose.Schema;

const userSchemas = {
    
    user: new Schema({
        username: {type: String},
        password: {type: String},
        role: {type: String}
    })
};

module.exports = userSchemas;