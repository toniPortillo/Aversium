'use strict';
module.exports = projectEntity => ({
    create: async (projectname, responsable, productBacklog, kanban, client, deadline) => {
        const query = {projectname: projectname};
        const projectFound = await projectEntity.find(query);

        if(!projectFound.length) {
            projectEntity.projectname = projectname;
            projectEntity.responsable = responsable;
            projectEntity.productBacklog = productBacklog;
            projectEntity.kanban = kanban;
            projectEntity.client = client;
            projectEntity.deadline = deadline;

            return await projectEntity.save();
        }else {
            throw new Error("Proyecto ya existente");
        }
    },
    getAll: async () => {
        const query = {};
        const list  = await projectEntity.find(query);
        
        if(list.length !== 0) {
            return list;
        }else {
            throw new Error("Lista de proyectos vacia");
        }
    },
    findOneByName: async (projectname) => {
        const query = {projectname: projectname};
        const projectFound = await projectEntity.find(query);

        if(projectFound.length !== 0) {
            return projectFound;
        }else {
            throw new Error("Proyecto no encontrado");
        }
    },
    findOneById: async (_id) => {
        const query = {_id: _id};
        const projectFound =  await projectEntity.find(query);

        if(projectFound.length !== 0) {
            return projectFound;
        }else {
            throw new Error("Proyecto no encontrado");
        }
    },
    removeById: async (_id) => {
        const query = {_id: _id};
        
    }
})