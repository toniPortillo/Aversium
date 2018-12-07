'use strict';

let bcrypt = require('bcrypt');

let comparePassword = (passwordPlainText, user, res) => {
    bcrypt.compare(passwordPlainText,  user[0].password)
    .then((response) => {
        if(response) {

            res.send('Usuario logueado' + user);
        }else {
            res.send('Error al introducir la contraseña');
        }
    })
    .catch((err) => {
        if(err) throw err;
    });
};

module.exports = comparePassword;