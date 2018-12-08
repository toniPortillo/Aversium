'use strict';

const mongoose = require('../../config/mongoose/dbAversium');
const teamSchema = require('../mongoSchemas/teamSchema').team;

const teamModels = {
    Team: mongoose.model('Team', teamSchema)
};

module.exports = teamModels;