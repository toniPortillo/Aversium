'use strict';
let User = require('../../models/mongoModels/userModel').User;
let encryptor = require('../middlewares/encrypt');
let comparePassword = require('../middlewares/comparePassword');

exports.user_register_get = function(req, res) {

    res.render('users/register.ejs', {
        err: ""
    });
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

            res.render('users/register.ejs', {
                err: "Este email de usuario no esta disponible"
            });
        }
    }).catch((err) => {
       
        if(err) throw err;
    });
};

exports.user_login_get = function(req, res) {

    res.render('users/login.ejs', {
        err: ""
    });
};

exports.user_login_post = function(req, res) {
    
    User.find({email: req.body.email})
    .then((user) => {
        
        if(user.length === 1) {

            comparePassword(req.body.password, user, res);
        }else {

            res.render('users/login.ejs', {
                err: "Hubo un error, al introducir el email de usuario"
            });
        }
    })
    .catch((err) => {
        
        if(err) throw err;  
    });
};