'use strict';
const models = require('../models/mongoModels/index');

const userEntity = models.User;
const teamEntity = models.Team;
const projectEntity = models.Project;

const createUserRepository = require('../repositories/userRepository');
const createTeamRepository = require('../repositories/teamRepository');
const createProjectRepository = require('../repositories/projectRepository');

module.exports = {
    User: createUserRepository(userEntity),
    Team: createTeamRepository(teamEntity),
    Project: createProjectRepository(projectEntity)
};