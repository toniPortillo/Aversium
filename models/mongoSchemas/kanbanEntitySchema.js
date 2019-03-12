'use strict';
module.exports = (db, Schemas) => {
    const kanbanSchemas = {
        kanban: new db.Schema({
            startDate: {type: Date, default: Date.now},
            toDo: {type: String},
            stories: {type: String},
            backlog: {type: String},
            thisSprint: {type: String},
            next: {type: String},
            doing: {type: String},
            forApproval: {type: String},
            done: {type: String}
        })
    };

    return kanbanSchemas;
};