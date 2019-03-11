'use strict';
module.exports = (db, user) => {
    const teamSchemas = {
        team: new db.Schema({
            teamname: {type: String, require: true},
            creator: [user],
            maxmembers: {type: Number, require: true},
            users: [user]
        })
    };

    return teamSchemas;
};