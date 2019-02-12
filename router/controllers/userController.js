'use strict';
let User = require('../../models/mongoModels/userModel').User;
let bcrypt = require('bcrypt');
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

exports.user_showuser_get = function(req, res) {

    User.find({email: req.params.email})
    .then(userbase => {

        if(userbase) res.render('users/showuser.ejs', {
            user: userbase[0],
            operation: ""
        })
    })
    .catch(err => {

        if(err) throw err;
    });
};

exports.user_modify_get = function(req, res) {

    User.find({email: req.params.email})
    .then(userbase => {

        if(userbase) res.render('users/modifyUser.ejs', {
                user: userbase[0],
                operation: "",
                err: ""
            });
    })
    .catch(err => {

        if(err) throw err
    });
};

exports.user_modifyrole_post = function(req, res) {
    
    User.find({email: req.params.email})
    .then(userbase => {


        if(userbase[0].role != req.body.role) {

            if(userbase)User.findOneAndUpdate({email: userbase[0].email},
                {role: req.body.role}, {new: true})
            .then(user => {
    
                if(user) res.render('users/modifyUser.ejs', {
                    user: user,
                    operation: "Modificación del rol, hecha con exito",
                    err: ""
                })
            })
        }else {

            res.render('users/modifyUser.ejs', {
                user: userbase[0],
                operation: "",
                err: "No se ha realizado modificación, eligio el mismo rol"
            })
        }
    })
    .catch(err => {

        if(err) throw err;
    });
}

exports.user_modifypassword_post = function(req, res) {

    User.find({email: req.params.email})
    .then(userbase => {

        bcrypt.compare(req.body.oldPassword, userbase[0].password)
        .then(response => {
            
            if(response) {
             
                return bcrypt.hash(req.body.newPassword, 12);
            }else {

                let err ="Error, introdujo mal la contraseña actual"
                throw err;
            }
        })
        .then(hash => {
           
            return User.findOneAndUpdate({email: userbase[0].email}, 
                {password: hash}, {new: true});
        })
        .then(user => {

            res.render('users/showuser.ejs', {
                user: user,
                operation: "Contraseña cambiada con exito"
            })
        })
        .catch(err => {

            res.render('users/showuser.ejs', {
                user: userbase[0],
                operation: err
            });
        });
    })
    .catch(err => {

        if(err) throw err;
    });
}