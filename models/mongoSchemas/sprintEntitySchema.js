'use strict';
module.exports = (db, Schemas) => {
    const sprintSchemas = {
        sprint: new db.Schema({
            startDate: {type: Date, default: Date.now},
            sprintBacklog: {type: String},
            deadline: {type: Date, require: true},
            meetings: {type: String}
        })
    };

    return sprintSchemas;
};