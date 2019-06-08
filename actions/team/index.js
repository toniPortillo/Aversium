'use strict';
const repositories = require('../../repositories/index');

const userRepository = repositories.User;
const teamRepository = repositories.Team;

const checkTeam = require('./../../services/team/checkTeam');

const createCreateTeam = require('./createTeam');
const createShowTeams = require('./showTeams');
const createShowTeam = require('./showTeam');
const createRemoveTeam = require('./removeTeam');
const createModifyMembersNumber = require('./modifyMembersNumber');
const createAddUser = require('./addUser');
const createDeleteUser = require('./deleteUser');

module.exports = {
    createTeam: createCreateTeam(teamRepository),
    showTeams = createShowTeams(teamRepository),
    showTeam = createShowTeam(teamRepository),
    removeTeam = createRemoveTeam(teamRepository),
    modifyMembersNumber = createModifyMembersNumber(teamRepository),
    addUser = createAddUser(teamRepository, userRepository, checkTeam),
    deleteUser = createDeleteUser(teamRepository, userRepository)
};