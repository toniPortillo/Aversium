'use strict';
module.exports = (db, schema) => {
    const teamModels = {
        Team: db.model('Team', schema)
    };

    return teamModels; 
};