'use strict';
module.exports = projectRepository => {
    const teamProjects = (projectList, team) => {
        return new Promise((resolve, reject) => {
            if(projectList === undefined || team === undefined) reject(new Error ("Lista para filtrar por equipo no definida"));
            const listTeamProjects = [];
            setTimeout(() => {
                projectList.map((x) => {
                    if(x.teams.teamname === team.teamname) {
                        listTeamProjects.push(x);
                    }
                });
                resolve(listTeamProjects);
            }, 0);
        })
    };

    return async (team) => {
        try {
            const projectList = await projectRepository.getAll();
            const listTeamProjects = await teamProjects(projectList, team);
            if(projectList.message === "Lista de proyectos no definida") throw new Error("Lista de proyectos no definida");
            return listTeamProjects;
        }catch (err){
            throw err;
        }
    };
};