'use strict';
const mongoose = require('../../utils/mongoose/database');
const schemas = require('../mongoSchemas/index');
const Schemas = schemas(mongoose);

const createUserEntity = require('./userEntity');
const userModel = createUserEntity(mongoose, Schemas);
const createTeamEntity = require('./teamEntity');
const teamModel = createTeamEntity(mongoose, Schemas);
const createProjectEntity = require('./projectEntity');
const projectModel = createProjectEntity(mongoose, Schemas);

module.exports = {
    User: userModel.User,
    Team: teamModel.Team,
    Project: projectModel.Project
};