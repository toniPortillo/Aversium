'use strict';
module.exports = (db, Schemas) => {
    const userModels = {
        User: db.model('User', Schemas.user)
    };

    return userModels;
};