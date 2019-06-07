'use strict';
const repositories = require('../../repositories/index');

const userRepository = repositories.User;
const teamRepository = repositories.Team;

const createCreateTeam = require('./createTeam');
const createShowTeams = require('./showTeams');
const createShowTeam = require('./showTeam');
const createRemoveTeam = require('./removeTeam');
const createModifyMembersNumber = require('./modifyMembersNumber');
const createAddUser = require('./addUser');

module.exports = {
    
};