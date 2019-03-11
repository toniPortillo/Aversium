'use strict';

const mongoose = require('../../config/mongoose/dbAversium');
const projectSchema = require('../mongoSchemas/projectSchema').project;

const projectModels = {

    Project: mongoose.model('Project', projectSchema)
};

module.exports = projectModels;