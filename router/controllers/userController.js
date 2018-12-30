'use strict';
let User = require('../../models/mongoModels/userModel').User;
let encryptor = require('../middlewares/encrypt');
let comparePassword = require('../middlewares/comparePassword');

exports.user_register_get = function(req, res) {

    res.render('register.ejs');
};

exports.user_register_post = function(req, res) {

    User.find({email: req.body.email})
    .then((user) => {
        
        if(user.length === 0){
            
            let saveUser = new User({
                username: req.body.username,
                email: req.body.email,
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
    console.log(req.body.email);
    User.find({email: req.body.email})
    .then((user) => {
        
        console.log(user[0]);
        if(user.length === 1) {

            comparePassword(req.body.password, user, res);
        }else {

            res.send('Error al introducir email de usuario');
        }
    })
    .catch((err) => {
        
        if(err) throw err;  
    });
};