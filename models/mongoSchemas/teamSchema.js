'use strict';
const mongoose = require('../../config/mongoose/dbAversium');
const Schema = mongoose.Schema;
const user = require('./userSchema').user; 

const teamSchemas = {

    team: new Schema({
        teamname: {type: String},
        creator: {type: String},
        maxmembers: {type: Number},
        users: [user]
    })
};

module.exports = teamSchemas;