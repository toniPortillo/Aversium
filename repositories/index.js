'use strict';
const models = require('../models/mongoModels/index');

const userEntity = models.User;
const teamEntity = models.Team;
const projectEntity = models.Project;

const createProjectRepository = require('../repositories/projectRepository');

module.exports = {
    Project: createProjectRepository(projectEntity)
};