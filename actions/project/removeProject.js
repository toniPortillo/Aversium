'use strict';
module.exports = projectRepository => {
    const validateResponsable = (project, responsable) => {
        return new Promise((resolve, reject) => {
            if(project === undefined) reject(new Error("Proyecto no definido"));
            if(responsable === undefined) reject(new Error("Responsable no definido"));
            if(project.responsable._id === responsable._id) resolve(project);
            reject(new Error ("No puede eliminar el proyecto, por no ser su responable"));
        });
    };
    
    return async (project, user) => {
        try {
            if(project === undefined) throw new Error("Proyecto no definido");
            const removeProjectValidated = await validateResponsable(project, user);
            if(removeProjectValidated instanceof Error) throw new Error(removeProjectValidated.message);
            const projectDeleted = await projectRepository.removeById(project._id);
            if(projectDeleted instanceof Error) throw new Error(projectDeleted.message);
            const projectRemoved = {
                project: projectDeleted,
                message: "Proyecto eliminado exitosamente"
            } 
            return projectRemoved;
        }catch(err) {
            throw err;
        }
    };
};