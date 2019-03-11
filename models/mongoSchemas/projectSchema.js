'use strict';
const mongoose = require('../../config/mongoose/dbAversium');
const Schema = mongoose.Schema;
const team = require('./teamSchema').team;

const projectSchemas = {

    project: new Schema({
        projectname: {type: String, require: true},
        teams: [team],
        responsable: {type: String, require: true},
        productBacklog: [productBacklog],
        kanban: [kanban],
        sprints: [sprint],
        client: {type: String, require: true},
        startDate: {type: Date, default: Date.now },
        deadline: {type: Date, required: true}
    })
};

module.exports = projectSchemas;