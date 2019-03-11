'use strict';
module.exports = (db) => {
    const userSchemas = {
        user: new db.Schema({
            username: {type: String, require: true},
            email: {type: String, require: true},
            password: {type: String, require: true},
            role: {type: String, require: true}
        })
    };

    return userSchemas;
};