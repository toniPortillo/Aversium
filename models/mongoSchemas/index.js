'use strict';

const userEntitySchema = require('./userEntitySchema');
const teamEntitySchema = require('./teamEntitySchema');
const productBacklogEntitySchema = require('./productBacklogEntitySchema');
const kanbanEntitySchema = require('./kanbanEntitySchema');
const sprintEntitySchema = require('./sprintEntitySchema');
const projectEntitySchema = require('./projectEntitySchema');

module.exports = (db) => {
    let Schemas = {};
    const userSchema = userEntitySchema(db, Schemas);
    Schemas.user = userSchema.user;
    const teamSchema = teamEntitySchema(db, Schemas);
    Schemas.team = teamSchema.team;
    const productBacklogSchema = productBacklogEntitySchema(db, Schemas);
    Schemas.productBacklog = productBacklogSchema.productBacklog;
    const kanbanSchema = kanbanEntitySchema(db, Schemas);
    Schemas.kanban = kanbanSchema.kanban;
    const sprintSchema = sprintEntitySchema(db, Schemas);
    Schemas.sprint = sprintSchema.sprint;
    const projectSchema = projectEntitySchema(db, Schemas);
    Schemas.project = projectSchema.project;

    return Schemas;
};