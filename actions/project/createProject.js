'use strict';
module.exports = projectRepository => ({
    _validations: (projectToCreate) => {
        return new Promise((resolve, reject) => {
            if(!projectToCreate.projectname || typeof projectToCreate.projectname !== 'undefined') 
            reject(new Error("Error: en el nombre del proyecto"));
             
        });
    },
    _createProject: async projectToCreate => {
      if(projectToCreate.length !== 0) {
          const projectCreated = {
              projectToCreate: await projectRepository.create(projectToCreate.projectname,
                projectToCreate.responsable, projectToCreate.productBacklog, projectToCreate.kanban,
                projectToCreate.client, projectToCreate.deadline),
              message: "Proyecto creado exitosamente"
          }
          if(projectToCreate != "Proyecto ya existente"){
              return projectCreated
          }else {
              throw projectCreated.projectCreated;
          }
      }else {
          throw new Error("Proyecto vacio");  
      } 
    }
});