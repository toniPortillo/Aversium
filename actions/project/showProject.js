'use strict';
module.exports = projectRepository => {
    return async projectName => {
        try {
            if(projectName === undefined) throw new Error("Nombre de proyecto no definido");
            const project = await projectRepository.findOneByName(projectName);
            if(project instanceof Error) throw new Error(project.message);
            return project;
        }catch(err) {
            throw err;
        }
    };
};