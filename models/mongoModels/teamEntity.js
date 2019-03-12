'use strict';
module.exports = (db, Schemas) => {
    const teamModels = {
        Team: db.model('Team', Schemas.team)
    };

    return teamModels; 
};