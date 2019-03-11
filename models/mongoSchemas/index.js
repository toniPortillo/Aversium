'use strict';

const userEntitySchema = require('./userEntitySchema');
const teamEntitySchema = require('./teamEntitySchema');

module.exports = (db) => {
    const userSchema = userEntitySchema(db);
    const teamSchema = teamEntitySchema(db, userSchema.user);
    
    return {
        user: userSchema.user,
        team: teamSchema.team
    };
};