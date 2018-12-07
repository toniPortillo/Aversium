'use strict';
let User = require('../../models/mongoModels/userModel').User;
let encryptor = require('../middlewares/encrypt');
let comparePassword = require('../middlewares/comparePassword');

exports.user_register_get = function(req, res) {

    res.render('register.ejs');
};

exports.user_register_post = function(req, res) {

    User.find({username: req.body.username}).then((user) => {
        //if(err) throw err;
        console.log(user.length);
        if(user.length === 0){
            let saveUser = new User({
                username: req.body.username,
                password: req.body.password,
                role: req.body.role
            });
            encryptor(saveUser, res);
        }else {
            res.send("Usuario no disponible" + user);
        }
    }).catch((err) => {
        if(err) throw err;
    });
};

exports.user_login_get = function(req, res) {

    res.render('login.ejs');
};

exports.user_login_post = function(req, res) {

    User.find({username: req.body.username})
    .then((user) => {
        
        console.log(user[0].password);
        if(user.length === 1) {

            comparePassword(req.body.password, user, res);
        }else {
            res.send('Error al introducir el nombre de usuario');
        }
    })
    .catch((err) => {
        if(err) throw err;
        
    });
};