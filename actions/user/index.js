'use strict';
const bcrypt = require('bcrypt');
const passwordComparer = require('../../services/user/passwordComparer');
const encryptor = require('../../services/user/encryptor');
const repositories = require('../../repositories/index');

const userRepository = repositories.User;
const teamRepository = repositories.Team;
const projectRepository = repositories.Project;

const passwordComparerLoaded = passwordComparer(bcrypt);
const encryptorLoaded = encryptor(bcrypt);

const createUserRegister = require('./userRegister');
const createUserLogin = require('./userLogin');
const createShowUser = require('./showUser');
const createModifyRole = require('./modifyRole');
const createModifyPassword = require('./modifyPassword');
const createUserLogout = require('./userLogout');

module.exports = {
    userRegister: createUserRegister(userRepository),
    userLogin: createUserLogin(userRepository, passwordComparerLoaded),
    showUser: createShowUser(userRepository),
    modifyRole = createModifyRole(userRepository),
    modifyPassword = createModifyPassword(userRepository, passwordComparerLoaded, encryptorLoaded),
    userLogout: createUserLogout()
};