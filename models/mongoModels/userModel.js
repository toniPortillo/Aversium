'use strict';

const mongoose = require('../../config/mongoose/dbAversium');
const userSchema = require('../mongoSchemas/userSchema.js').user;

const userModels = {
    User: mongoose.model('User', userSchema)
};

module.exports = userModels;