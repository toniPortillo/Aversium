'use strict';
let Team = require('../../models/mongoModels/teamModel').Team;
let User = require('../../models/mongoModels/userModel').User;
let deleteUserTeam = require('../middlewares/deleteUsersTeam');
let CheckTeam = require('../middlewares/checkTeam');

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

exports.team_modify_addUser_post = (req, res) => {
    Team.find({teamname: req.params.nombre})
    .then(team => {

        User.find({username: req.body.adduser})
        .then(user => {

            //team[0].users.push(user[0]);
            //let usersArray = team[0].users;
            console.log(user[0]);
            let checkTeam = new CheckTeam(team[0]);
            console.log(checkTeam.availableMembers);
            checkTeam.setProductOwner(team[0].users)
            .then(() => {
                console.log(checkTeam.getProductOwner());
                return checkTeam.setScrumMaster(team[0].users);
            })
            .then(() => {
                console.log(checkTeam.getScrumMaster());
                console.log(checkTeam.devsMembers);
                return checkTeam.checkFactory(user[0]);
            })
            .then((confirmation) => {
                if(confirmation) {
                
                    res.send("Se ha añadido el usuario");
                }else {

                    res.send("No se ha añadido el usuario");
                }
            });

            /*if(!user) {
                let err = "Usuario no encontrado";
                res.render('modifyTeam.ejs', {
                    team: team, 
                    err: err
                });
            }else {
                if(confirmation === true) {
                    Team.findOneAndUpdate({teamname: req.params.nombre},
                        {users: usersArray}, {new: true})
                    .then(team => {
                        res.send(team);
                    });

                }else {
                    res.send("No se ha podido añadir miembro");
                }
            }*/
        }); 
          
        
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
