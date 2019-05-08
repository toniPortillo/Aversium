'use strict';
module.exports = projectRepository => {
    const validateUser = (project, user) => {
        return new Promise((resolve, reject) => {
            let validate = false;
            if(project === undefined || user === undefined) reject(new Error("Proyecto o usuario no definidos"));
            setTimeout(() => {
                project.teams.map(team => {
                    team.users.map(userProject => {
                        if(userProject.username === user.username) validate = true
                    })
                });
                if(validate) resolve(project);
                else {
                    reject(new Error("El usuario no pertenece a equipos del proyecto"));
                }
            }, 0);
        });
    };

    return async (projectName, user) => {
        try {
            if(projectName === undefined) throw new Error("Nombre de proyecto no definido");
            const project = await projectRepository.findOneByName(projectName);
            if(project instanceof Error) throw new Error(project.message);
            const showProjectValidated = await validateUser(project, user);
            if(showProjectValidated instanceof Error) throw new Error(showProjectValidated.message);
            return showProjectValidated;
        }catch(err) {
            throw err;
        }
    };
};