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

            res.render('teams/listTeams.ejs', {
                list : list});
        });
    })
    .catch((err) => {

        if(err) throw err;
    });
};

exports.team_show_get = (req, res) => {
    
    Team.find({teamname: req.params.nombre})
    .then(baseteam => {

        res.render('teams/showTeam.ejs', {
            team: baseteam[0]
        })
    })
    .catch(err => {

        if(err) throw err;
    });
};

exports.team_create_get = (req, res) => {

    res.render('teams/createTeam.ejs');
};

exports.team_create_post = (req, res) => {

    if(req.body.teamname.length != 0 && req.body.creator.length != 0 &&
        req.body.maxmembers.length != 0) {

            Team.find({teamname: req.body.teamname})
            .then((baseteam) => {

                if(baseteam.length === 0) {
                    let greatherThanCero = req.body.maxmembers;

                    if(req.body.maxmembers < 1) {
                        greatherThanCero = 1;
                    }

                    let saveTeam = new Team({
                        teamname: req.body.teamname,
                        creator: req.body.creator,
                        maxmembers: greatherThanCero,
                        users: req.body.users
                    });

                    saveTeam.save()
                    .then(team => {

                        console.log(team);
                        res.send(saveTeam + "Equipo creado");
                    });
                }else {

                    res.send("Equipo no disponible");
                }
            }).catch((err) => {

                if(err) throw err;   
            });
    }else {

        res.render('teams/createTeam.ejs');
    }
};

exports.team_delete_get = (req, res) => {

    res.send('respond with a resource');
};

exports.team_delete_post = (req, res) => {

    Team.find({teamname: req.params.nombre})
    .then(team => {

        if(!team) res.send("Error en el borrado del equipo");
        Team.remove({teamname: team[0].teamname})
        .then(() => {

            res.send("Equipo borrado");
        });
    })
    .catch(err => {

        if(err) throw err;
    });
};

exports.team_modify_get = (req, res) => {
    
    Team.find({teamname: req.params.nombre})
    .then((team) => {
    
        res.render('teams/modifyTeam.ejs', {
            team: team[0],
            err: ""
        });
    })
    .catch((err) => {

        if(err) throw err;
    });   
};

exports.team_modify_addUser_post = (req, res) => {

    Team.find({teamname: req.params.nombre})
    .then(baseteam => {

        User.find({email: req.body.adduser})
        .then(user => {

            let checkTeam = new CheckTeam(baseteam[0]);
            
            checkTeam.setProductOwner(baseteam[0].users)
            .then(() => {

                return checkTeam.setScrumMaster(baseteam[0].users);  
            })
            .then(() => {

                return checkTeam.checkFactory(user[0]);
            })
            .then(confirmation => {

                baseteam[0].users.push(user[0]);
                let usersArray = baseteam[0].users;
                
                if(confirmation === true) {

                    Team.findOneAndUpdate({teamname: baseteam[0].teamname},
                        {users: usersArray}, {new: true})
                    .then(team => {
                        
                        res.render('teams/modifyTeam.ejs', {
                            team: team,
                            err: ""
                        });
                    })
                    .catch(err => {

                        if(err) throw err;
                    });  
                }else {

                    res.send("No se ha añadido el usuario");
                }
            })
            .catch(err => {
                
                res.render('teams/modifyTeam.ejs', {
                    team: baseteam[0],
                    err: "El usuario introducido para ser añadido al equipo, no existe"
                });
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
    .then(baseteam => {

        User.find({email: req.body.deleteuser})
        .then(user => {
            
            let usersArray = baseteam[0].users;
            
            deleteUserTeam(usersArray, user[0])
            .then(usersTeam => {

                Team.findOneAndUpdate({teamname: baseteam[0].teamname},
                    {users: usersTeam}, {new: true})
                .then(team => {
                    
                    res.render('teams/modifyTeam.ejs', {
                        team: team,
                        err: ""
                    });
                })
                .catch(err => {

                    if(err) throw err;
                });
            })
            .catch(err => {

                res.render('teams/modifyTeam.ejs', {
                    team: baseteam[0],
                    err: "El usuario introducido para ser eliminado del equipo, no existe"
                });
            });
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
    .then(baseteam => {
       
        if(req.body.membersNumber.length === 0 || req.body.membersNumber === "0") {
            
            res.render('teams/modifyTeam.ejs', {
                team: baseteam[0],
                err: "El número introducido no es válido"
            })
        }else if(baseteam[0].users.length <= req.body.membersNumber) {
            
            Team.findOneAndUpdate({teamname: baseteam[0].teamname},
                {maxmembers: req.body.membersNumber}, {new: true})
            .then(team => {

                res.render('teams/modifyTeam.ejs', {
                    team: team,
                    err: ""
                });
            })
            .catch(err => {

                if(err) throw err;
            });
        }else {

            res.render('teams/modifyTeam.ejs', {
                team: baseteam[0],
                err: "Error: Existen ya un número mayor de miembros, de los que quiere restringir"
            });
        }
    })
    .catch(err => {

        if(err) throw err;
    });
};
