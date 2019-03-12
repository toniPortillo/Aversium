'use strict';
module.exports = (db, Schemas) => {
    const projectModels = {
        Project: db.model('Project', Schemas.project)
    }

    return projectModels;
};