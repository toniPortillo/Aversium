'use strict';
const bcrypt = require('bcrypt');
let userCookie = require('../cookies/userCookie');

let encryptor = (user, res, req) => {

    bcrypt.hash(user.password, 12)
    .then((hash) => {

        user.password = hash;
        user.save()
        .then(user => {
            
            req.session.user = userCookie;
            req.session.user._id = user._id;
            req.session.user.username = user.username;
            req.session.user.email = user.email;
            req.session.user.role = user.role;
            res.render('users/showuser.ejs', {
                user: user,
                operation: "Usuario creado con exito"
            });
        });
    });
};

module.exports = encryptor;