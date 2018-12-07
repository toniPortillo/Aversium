'use strict';
const bcrypt = require('bcrypt');

let encryptor = (user, res) => {
    bcrypt.hash(user.password, 12)
    .then((hash) => {
        user.password = hash;
        user.save()
        .then(() => {
            res.send(user);
        });
    });
};

module.exports = encryptor;