'use strict';
module.exports = projectRepository => {
    const _validations = (projectToCreate) => {
        return new Promise((resolve, reject) => {
            if(!projectToCreate.projectname || typeof projectToCreate.projectname !== 'string')
            reject(new Error("Error: en el nombre del proyecto"));
            else if(!projectToCreate.responsable || typeof projectToCreate.responsable !== 'object' )
            reject(new Error("Error: en el responsable del proyecto"));
            else if(!projectToCreate.productBacklog || typeof projectToCreate.productBacklog !== 'object') 
            reject(new Error("Error: en el productBacklog del proyecto"));
            else if(!projectToCreate.kanban || typeof projectToCreate.kanban !== 'object')
            reject(new Error("Error: en el kanban del proyecto"));
            else if(!projectToCreate.client || typeof projectToCreate.client !== 'string')
            reject(new Error("Error: en el cliente del proyecto"));
            else if(!projectToCreate.deadline || typeof projectToCreate.deadline !== 'object')
            reject(new Error("Error: en el deadline del proyecto"));
            else {
                let message = "Successful validation";
                resolve(message);
            }
        });
    }
    return async projectToCreate => {
        try{
            if(projectToCreate.length !== 0) {
                const validation =  await _validations(projectToCreate);
                if(validation === "Successful validation") {
                    const projectCreated = {
                      project: await projectRepository.create(projectToCreate.projectname,
                        projectToCreate.responsable, projectToCreate.productBacklog, projectToCreate.kanban,
                        projectToCreate.client, projectToCreate.deadline),
                      message: "Proyecto creado exitosamente"
                    }
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