'use strict';

let bcrypt = require('bcrypt');

let comparePassword = (passwordPlainText, user, res, req) => {
    
    bcrypt.compare(passwordPlainText,  user[0].password)
    .then((response) => {        

        if(response) {
            
            req.session.user_id = user[0]._id;
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