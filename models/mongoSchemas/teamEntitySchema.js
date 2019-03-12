'use strict';
module.exports = (db, Schemas) => {
    const teamSchemas = {
        team: new db.Schema({
            teamname: {type: String, require: true},
            creator: {type: [Schemas.user], require: true},
            maxmembers: {type: Number, require: true},
            users: [Schemas.user]
        })
    };

    return teamSchemas;
};