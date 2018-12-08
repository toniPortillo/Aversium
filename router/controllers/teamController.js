'use strict';
let Team = require('../../models/mongoModels/teamModel').Team;

exports.team_create_get = (req, res) => {
    res.render('createTeam.ejs')
};

exports.team_create_post = (req, res) => {
    res.send('respond with a resource');
};

exports.team_delete_get = (req, res) => {
    res.send('respond with a resource');
};

exports.team_delete_post = (req, res) => {
    res.send('respond with a resource');
};

exports.team_modify_get = (req, res) => {
    res.send('respond with a resource');
};

exports.team_modify_post = (req, res) => {
    res.send('respond with a resource');
};

