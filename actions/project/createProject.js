'use strict';
module.exports = (projectRepository, teamRepository) => {
    const _validations = (projectToCreate) => {
        return new Promise((resolve, reject) => {
            if(projectToCreate.projectname === undefined || typeof projectToCreate.projectname !== 'string')
            reject(new Error("Error: en el nombre del proyecto"));
            else if(projectToCreate.responsable === undefined|| typeof projectToCreate.responsable !== 'object' )
            reject(new Error("Error: en el responsable del proyecto"));
            else if(projectToCreate.productBacklog === undefined || typeof projectToCreate.productBacklog !== 'object') 
            reject(new Error("Error: en el productBacklog del proyecto"));
            else if(projectToCreate.kanban === undefined|| typeof projectToCreate.kanban !== 'object')
            reject(new Error("Error: en el kanban del proyecto"));
            else if(projectToCreate.client === undefined|| typeof projectToCreate.client !== 'string')
            reject(new Error("Error: en el cliente del proyecto"));
            else if(projectToCreate.deadline === undefined || typeof projectToCreate.deadline !== 'object')
            reject(new Error("Error: en el deadline del proyecto"));
            else {
                let message = "Successful validation";
                resolve(message);
            }
        });
    }
    return async (projectToCreate, user) => {
        try{
            if(projectToCreate.length !== 0) {
                const validation =  await _validations(projectToCreate);
                if(validation === "Successful validation") {
                    const project = await projectRepository.create(projectToCreate.projectname,
                        user, projectToCreate.productBacklog, projectToCreate.kanban,
                        projectToCreate.client, projectToCreate.deadline);
                    if(project.message === "Proyecto ya existente") throw new Error("Proyecto ya existente"); 
                    const projectCreated = {
                        project: project,
                        message: "Proyecto creado exitosamente"
                    };
                    return projectCreated;
                }
            }else {
                throw new Error("Proyecto vacio");  
            } 
        }catch(err) {
            throw err;
        }
    }
}; 