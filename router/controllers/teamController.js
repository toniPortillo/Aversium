'use strict';
let Team = require('../../models/mongoModels/teamModel').Team;
let User = require('../../models/mongoModels/userModel').User;
let deleteUserTeam = require('../middlewares/deleteUsersTeam');
let CheckTeam = require('../middlewares/checkTeam');

exports.team_list_get = (req, res) => {
    let list = [];
    let i = 0;
    let allPromises = [];
    
    Team.find()
    .then((teams) => {
        console.log(teams.length);
        teams.forEach((team) => {
            allPromises[i] = new Promise((resolve, reject) => {
                if(team.length != 0) {
                    list[i] = {
                        teamname : team.teamname,
                        creator : team.creator,
                        maxmembers : team.maxmembers,
                        users : team.users
                    }
                    i = i + 1;
                    resolve(list[i]); 
                }
            });
        });

        Promise.all(allPromises)
        .then(() => {

            res.render('listTeams.ejs', {list : list});
        });
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
    
    Team.find({teamname: req.params.nombre})
    .then((team) => {
        res.render('modifyTeam.ejs', {
            team: team,
        });
    })
    .catch((err) => {
        if(err) throw err;
    });   
};

exports.team_modify_addUser_post = (req, res) => {
    Team.find({teamname: req.params.nombre})
    .then(team => {

        User.find({email: req.body.adduser})
        .then(user => {

            
            let checkTeam = new CheckTeam(team[0]);
            
            checkTeam.setProductOwner(team[0].users)
            .then(() => {
                return checkTeam.setScrumMaster(team[0].users);
                
            })
            .then(() => {
                return checkTeam.checkFactory(user[0]);
                
            })
            .then(confirmation => {
                team[0].users.push(user[0]);
                let usersArray = team[0].users;
                
                if(confirmation === true) {

                    Team.findOneAndUpdate({teamname: team[0].teamname},
                        {users: usersArray}, {new: true})
                    .then(team => {
                        res.send(team);
                    })
                    .catch(err => {
                        if(err) throw err;
                    });  
                }else {

                    res.send("No se ha añadido el usuario");
                }
            })
            .catch(err => {
                res.send(err);
            });
        })
        .catch(err => {
            if(err) throw err;
        });       
    })
    .catch(err => {
        if(err) throw err;
    });    
};


exports.team_modify_deleteUser_post = (req, res) => {
    Team.find({teamname: req.params.nombre})
    .then(team => {

        User.find({username: req.body.deleteuser})
        .then(user => {
            console.log(user[0]);
            let usersArray = team[0].users;
            let usersTeam = deleteUserTeam(usersArray, user[0]);
            console.log(usersArray);
            console.log(usersTeam);

            if(!user) {
                let err = "Usuario no encontrado";
                res.render('modifyTeam.ejs', {
                    team: team,
                    err: err
                });
            }else {
                Team.findOneAndUpdate({teamname: req.params.nombre},
                    {users: usersTeam}, {new: true})
                .then(team => {
                    res.send(team);
                });
            }
        })
        .catch(err => {
            if(err) throw err;
        })
    })
    .catch(err => {
        if(err) throw err;
    });
};

exports.team_modify_membersNumber_post = (req, res) => {

    Team.find({teamname: req.params.nombre})
    .then(team => {
        console.log(team[0].users.length);
        console.log(req.body.membersNumber);
        if(team[0].users.length <= req.body.membersNumber) {
            
            Team.findOneAndUpdate({teamname: req.params.nombre},
                {maxmembers: req.body.membersNumber}, {new: true})
            .then(team => {
                res.send(team);
            });

        }else {
            res.send("Error: Existen ya un número mayor de miembros, de los que quiere restringir");
        }
    })
    .catch(err => {
        if(err) throw err;
    });
};
