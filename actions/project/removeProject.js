'use strict';
module.exports = projectRepository => {
    const validateResponsable = (project, responsable) => {
        if(project === undefined) throw new Error("Proyecto no definido");
        if(user === undefined) throw new Error("Responsable no definido")
    };
    return async (project, user) => {
        try {
            if(projectId === undefined) throw new Error("Id del proyecto no definido");
            const removeProjectValidated = await validateResponsable(project, user);
            const project = await projectRepository.removeById(projectId);
            if(project instanceof Error) throw new Error(project.message);
        }catch(err) {

        }
    };
};