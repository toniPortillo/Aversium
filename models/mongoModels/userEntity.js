'use strict';

module.exports = (db, schema) => {
    const userModels = {
        User: db.model('User', schema)
    };

    return userModels;
};