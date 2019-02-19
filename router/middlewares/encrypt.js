'use strict';
const bcrypt = require('bcrypt');

let encryptor = (user, res, req) => {

    bcrypt.hash(user.password, 12)
    .then((hash) => {

        user.password = hash;
        user.save()
        .then(user => {
            
            req.session.user_id = user._id;
            res.render('users/showuser.ejs', {
                user: user,
                operation: "Usuario creado con exito"
            });
        });
    });
};

module.exports = encryptor;