'use strict';

let bcrypt = require('bcrypt');
let userCookie = require('../cookies/userCookie.js');

let comparePassword = (passwordPlainText, user, res) => {
    
    bcrypt.compare(passwordPlainText,  user[0].password)
    .then((response) => {        

        if(response) {
            
            userCookie.username = user[0].username;
            userCookie.email = user[0].email;
            userCookie.role = user[0].role;

            res.cookie('user', userCookie, {maxAge: 3600000});
            res.render('users/showuser.ejs', {
                user: user[0],
                operation: ""
            });
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