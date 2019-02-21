'use strict';
let bcrypt = require('bcrypt');
let userCookie = require('../cookies/userCookie');

let comparePassword = (passwordPlainText, user, res, req) => {
    
    bcrypt.compare(passwordPlainText,  user[0].password)
    .then((response) => {        

        if(response) {
            
            req.session.user = userCookie;
            req.session.user._id = user[0]._id;
            req.session.user.username = user[0].username;
            req.session.user.email = user[0].email;
            req.session.user.role = user[0].role;
            res.redirect('/users/showuser');
        }else {

            res.render('users/login.ejs', {
                err: "Hubo un error, al introducir la contraseña de usuario"
            });
        }
    })
    .catch((err) => {

        if(err) throw err;
    });
};

module.exports = comparePassword;