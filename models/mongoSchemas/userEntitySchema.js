'use strict';

module.exports = (Schema) => {
    const userSchemas = {
        user: new Schema({
            username: {type: String, require: true},
            email: {type: String, require: true},
            password: {type: String, require: true},
            role: {type: String, require: true}
        })
    };

    return userSchemas;
};