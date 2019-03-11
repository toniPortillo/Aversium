'use strict';
let User = require('../../models/mongoModels/index').User;
let bcrypt = require('bcrypt');
let encryptor = require('../middlewares/encrypt');
let comparePassword = require('../middlewares/comparePassword');

exports.user_register_get = function(req, res) {

    req.session.user == undefined ? 
    res.render('users/register.ejs', { err : "" })
    : res.redirect('/users/showuser');
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

            encryptor(saveUser, res, req);
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
    
    req.session.user == undefined ? 
    res.render('users/login.ejs', { err : "" })
    : res.redirect('/users/showuser');
};

exports.user_login_post = function(req, res) {
    
    User.find({email: req.body.email})
    .then((user) => {
        
        if(user.length === 1) {

            comparePassword(req.body.password, user, res, req);
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

    req.session.user != undefined ? 
    res.render('users/showuser.ejs', {
        user: req.session.user,
        operation: ""
    }) : res.render('index.ejs', {
        title: 'Aversium',
        operation: ''
    });
};

exports.user_modify_get = function(req, res) {

    User.find({_id: req.session.user._id})
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
    
    User.find({_id: req.session.user._id})
    .then(userbase => {

        if(userbase[0].role != req.body.role) {

            if(userbase)User.findOneAndUpdate({_id: userbase[0]._id},
                {role: req.body.role}, {new: true})
            .then(user => {
    
                if(user) {
                    
                    req.session.user.role = user.role;
                    res.render('users/modifyUser.ejs', {
                        user: user,
                        operation: "Modificación del rol, hecha con exito",
                        err: ""
                    })
                } 
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

    User.find({_id: req.session.user._id})
    .then(userbase => {

        bcrypt.compare(req.body.oldPassword, userbase[0].password)
        .then(response => {
            
            if(response) {
             
                return bcrypt.hash(req.body.newPassword, 12);
            }else {

                let err = "Error, introdujo mal la contraseña actual";
                throw err;
            }
        })
        .then(hash => {
           
            return User.findOneAndUpdate({_id: userbase[0]._id}, 
                {password: hash}, {new: true});
        })
        .then(user => {

            res.render('users/modifyUser.ejs', {
                user: user,
                operation: "Contraseña cambiada con exito",
                err: ""
            })
        })
        .catch(err => {

            res.render('users/modifyUser.ejs', {
                user: userbase[0],
                operation: "",
                err: err
            });
        });
    })
    .catch(err => {

        if(err) throw err;
    });
}

exports.user_logout = function(req, res) {

    let destroy = new Promise((resolve, reject) => {
        
        let err = "Se ha producido un fallo en la desconexión"
        
        req.session.destroy();
        req.session == undefined ?
        resolve() : reject(err);
    });

    destroy.then(() => {

        res.redirect('/')
    })
    .catch((err) => {
        
        res.render('users/showuser.ejs', {
            user: req.session.user,
            operation: err
        });
    });
};