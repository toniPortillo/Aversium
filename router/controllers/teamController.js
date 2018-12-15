'use strict';
let Team = require('../../models/mongoModels/teamModel').Team;
let User = require('../../models/mongoModels/userModel').User;

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
    
    let err = "";
    Team.find({teamname: req.params.nombre})
    .then((team) => {
        res.render('modifyTeam.ejs', {
            team: team,
            err: err
        });
    })
    .catch((err) => {
        if(err) throw err;
    });
    
};

exports.team_modify_post = (req, res) => {

    
    //User.find({username: req.body.users})
    //.then((user) => {
        /*Team.findOneAndUpdate({teamname: req.params.nombre}, 
            {maxmembers:req.body.maxmembers, users: user}, {new: true})
            .then((team) => {
                res.send(team);
            });*/
        console.log(req.params.nombre);
        Team.find({teamname: req.params.nombre})
        .then((team) => {
            console.log(team[0].users.length);
            res.send(team[0].users[0]);
        })
        .catch((err) => {
            if(err) throw err;
        });
    //})
    //.catch((err) => {
    //      if(err) throw err;
    //});
};

exports.team_modify_addUser_post = (req, res) => {
    
    Team.find({teamname: req.params.nombre})
    .then(team => {

        User.find({username: req.body.users})
        .then(user => {
            let addUser = team[0].users.push(user);
            if(user) {
                let err = "Usuario no encontrado";
                res.render('modifyTeam.ejs', {
                    team: team, 
                    err: err
                });
            }else {
                Team.findOneAndUpdate({teamname: req.params.nombre},
                    {users: addUser}, {new: true})
                .then(team => {
                    res.render('modifyTeams.ejs', {
                        team:team
                    });
                });
            }

        });
    });
    
};

exports.team_modify_addUser_get = (req, res) => {
    res.send("respond with a resource");
};

exports.team_modify_deleteUser_post = (req, res) => {
    res.send("respond with a resource");
};

exports.team_modify_deleteUser_get = (req, res) => {
    res.send("respond with a resource");
};
