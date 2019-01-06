'use strict';

let bcrypt = require('bcrypt');

let comparePassword = (passwordPlainText, user, res) => {
    
    bcrypt.compare(passwordPlainText,  user[0].password)
    .then((response) => {
        if(response) {

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