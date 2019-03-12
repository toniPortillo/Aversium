'use strict';
module.exports = (db, Schemas) => {
    const projectSchemas = {
        project: new db.Schema({
            projectname: {type: String, require: true},
            teams: [Schemas.team],
            responsable: {type: [Schemas.user], require: true},
            productBacklog: [Schemas.productBacklog],
            kanban: [Schemas.kanban],
            sprints: [Schemas.sprint],
            client: {type: String, require: true},
            startDate: {type: Date, default: Date.now},
            deadline: {type: Date, require: true} 
        })
    };
    
    return projectSchemas;
};