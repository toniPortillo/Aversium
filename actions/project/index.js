'use strict';
const repositories = require('../../repositories/index');

const userRepository = repositories.User;
const teamRepository = repositories.Team;
const projectRepository = repositories.Project;

const createCreateProject = require('./createProject');
const createShowProjects = require('./showProjects');
const createShowProject = require('./showProject');
const createModifyProject = require('./modifyProject');
const createRemoveProject = require('./removeProject');

module.exports = {
    createProject: createCreateProject(projectRepository),
    showProjects: createShowProjects(projectRepository),
    showProject: createShowProject(projectRepository, userRepository),
    modifyProject: createModifyProject(projectRepository),
    removeProject: createRemoveProject(projectRepository)
};