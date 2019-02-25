'use strict';
let Team = require('../../models/mongoModels/teamModel').Team;
let User = require('../../models/mongoModels/userModel').User;
let deleteUserTeam = require('../middlewares/deleteUsersTeam');
let CheckTeam = require('../middlewares/checkTeam');
let CheckUser = require('../middlewares/checkUser');

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
                list : list,
                teamname: req.flash('aux'),
                operation: req.flash('operation'),
                err: req.flash('err')
            });
        });
    })
    .catch((err) => {

        if(err) throw err;
    });
};

exports.team_show_get = (req, res) => {
    
    Team.find({teamname: req.params.nombre})
    .then(baseteam => {
        CheckUser(baseteam[0].users, req.session.user.email)
        .then(() => {
            
            res.render('teams/showTeam.ejs', {
                team: baseteam[0] || req.flash('aux'),
                operation: req.flash('operation'),
                err: req.flash('err')
            })
        })
        .catch(() => {

            req.flash('aux', baseteam[0].teamname);
            req.flash('err', 'No perteneces al equipo');
            res.redirect('/teams/');
        });
    })
    .catch(err => {

        if(err) throw err;
    });
};

exports.team_create_get = (req, res) => {

    res.render('teams/createTeam.ejs', {
        err: ""
    });
};

exports.team_create_post = (req, res) => {

    if(req.body.teamname.length != 0 && req.body.maxmembers.length != 0) {

            Team.find({teamname: req.body.teamname})
            .then((baseteam) => {

                if(baseteam.length === 0) {
                    let greatherThanCero = req.body.maxmembers;

                    if(req.body.maxmembers < 1) {
                        greatherThanCero = 1;
                    }

                    let saveTeam = new Team({
                        teamname: req.body.teamname,
                        creator: req.session.user,
                        maxmembers: greatherThanCero,
                        users: req.session.user
                    });

                    saveTeam.save()
                    .then(team => {
            
                        req.flash('aux', team);
                        req.flash('operation', 'Equipo creado');
                        res.redirect('/teams/' + team.teamname);
                    });
                }else {
                    let err = "Equipo no disponible";
                    res.render('teams/createTeam.ejs', {
                        err: err
                    });
                }
            }).catch((err) => {

                if(err) throw err;   
            });
    }else {
        
        let err = "Dejo algún campo requerido, vacio"
        res.render('teams/createTeam.ejs', {
            err: err
        });
    }
};

exports.team_delete_get = (req, res) => {

    res.send('respond with a resource');
};

exports.team_delete_post = (req, res) => {

    Team.find({teamname: req.params.nombre})
    .then(baseteam => {

        CheckUser(baseteam[0].creator, req.session.user.email)
        .then(() => {

            if(!baseteam) {
                
                req.flash('err', "Error en el borrado del equipo");
                req.redirect('/teams/'+ baseteam[0].teamname);
            }
            Team.remove({teamname: baseteam[0].teamname})
            .then(() => {

                req.flash('operation', 'Equipo '+ baseteam[0].teamname 
                + ' eliminado exitosamente');
                res.redirect('/teams/');
            });
        })
        .catch(() => {

            req.flash('err', "No eres el creador del equipo")
            res.redirect('/teams/' + baseteam[0].teamname);
        });
    })
    .catch(err => {

        if(err) throw err;
    });
};

exports.team_modify_get = (req, res) => {
    
    Team.find({teamname: req.params.nombre})
    .then((team) => {

        CheckUser(team[0].creator, req.session.user.email)
        .then(() => {

            res.render('teams/modifyTeam.ejs', {
                team: team[0] || req.flash('aux'),
                err: req.flash('err')
            });
        })
        .catch(() => {

            req.flash('err', "No eres el creador del equipo")
            res.redirect('/teams/' + team[0].teamname);
        })
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

                return checkTeam.setDeveloper(baseteam[0].users, user[0]);
            })
            .then(() => {
                
                return checkTeam.checkFactory(user[0]);
            })
            .then(confirmation => {
                
                if(confirmation === true) {
                    
                    baseteam[0].users.push(user[0]);
                    let usersArray = baseteam[0].users;
                    
                    Team.findOneAndUpdate({teamname: baseteam[0].teamname},
                        {users: usersArray}, {new: true})
                    .then(team => {
                        
                        req.flash('aux', team);
                        res.redirect('/teams/modifyTeam/' + team.teamname);
                    })
                    .catch(err => {

                        if(err) throw err;
                    });  
                }else {

                    req.flash('aux', baseteam[0]);
                    req.flash('err', 'No se añadió usuario por limitaciones de rol, repetición o capacidad');
                    res.redirect('/teams/modifyTeam/' + baseteam[0].teamname);
                }
            })
            .catch(err => {
                
                req.flash('aux', baseteam[0]);
                req.flash('err', 'El usuario introducido para ser añadido al equipo, no existe');
                res.redirect('/teams/modifyTeam/' + baseteam[0].teamname);
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
            
            deleteUserTeam(usersArray, user[0], baseteam[0].creator[0])
            .then(usersTeam => {

                Team.findOneAndUpdate({teamname: baseteam[0].teamname},
                    {users: usersTeam}, {new: true})
                .then(team => {
                    
                    req.flash('aux', team);
                    res.redirect('/teams/modifyTeam/' + team.teamname);
                })
                .catch(err => {

                    if(err) throw err;
                });
            })
            .catch(error => {
                console.log(error);
                req.flash('aux', baseteam[0]);
                req.flash('err', error);
                res.redirect('/teams/modifyTeam/' + baseteam[0].teamname);
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
            
            req.flash('aux', baseteam[0]);
            req.flash('err', 'El número introducido no es válido');
            res.redirect('/teams/modifyTeam/' + baseteam[0].teamname);
        }else if(baseteam[0].users.length <= req.body.membersNumber) {
            
            Team.findOneAndUpdate({teamname: baseteam[0].teamname},
                {maxmembers: req.body.membersNumber}, {new: true})
            .then(team => {

                req.flash('aux', team);
                res.redirect('/teams/modifyTeam/' + team.teamname);
            })
            .catch(err => {

                if(err) throw err;
            });
        }else {
            
            req.flash('aux', baseteam[0]);
            req.flash('err', 'Existe ya un número mayor de miembros, de los que quiere restringir');
            res.redirect('/teams/modifyTeam/' + baseteam[0].teamname);
        }
    })
    .catch(err => {

        if(err) throw err;
    });
};
