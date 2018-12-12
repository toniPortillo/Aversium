'use strict';
let Team = require('../../models/mongoModels/teamModel').Team;

exports.team_list_get = (req, res) => {
    let list = [];
    let i = 0;
    
    Team.find().then((teams) => {
        teams.forEach((team) => {
            return new Promise((resolve, reject) => {
                if(team.length != 0) {
                    list[i] = {
                        teamname : team.teamname,
                        creator : team.creator,
                        maxmembers : team.maxmembers,
                        users : team.users
                    }
                    i = i + 1;
                    resolve(list[i]); 
                
                }else {
                    reject('Elemento vacio');
                }
            });
        })
        res.render('listTeams.ejs', {list : list} );
    })
    .catch((err) => {
        if(err) throw err;
    });
};

exports.team_create_get = (req, res) => {
    res.render('createTeam.ejs')
};

exports.team_create_post = (req, res) => {

    if(req.body.teamname.length != 0 && req.body.creator.length !=0 &&
        req.body.maxmembers.length !=0) {

            Team.find({teamname: req.body.teamname}).then((team) => {
                if(team.length === 0) {
                    let saveTeam = new Team({
                        teamname: req.body.teamname,
                        creator: req.body.creator,
                        maxmembers: req.body.maxmembers,
                        users: req.body.users
                    });
                    saveTeam.save();
                    res.send(saveTeam + "Equipo creado");
                
                }else {
                    res.send("Equipo no disponible");
                }
            }).catch((err) => {
                if(err) throw err;   
            });
    }
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

