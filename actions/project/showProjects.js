'use strict';
module.exports = projectRepository => {
    const teamProjects = (projectList, team) => {
        return new Promise((resolve, reject) => {
            const listTeamProjects = [];
            if(projectList === undefined || team === undefined) reject(new Error("Lista o equipo no definidos"));
            setTimeout(() => {
                if(projectList.length === 0) resolve(projectList);
                projectList.map((project) => {
                    project.teams.map((teamProject) => {
                        if(teamProject.teamname === team.teamname) listTeamProjects.push(project);
                    });
                });
                resolve(listTeamProjects);
            }, 0);
        });
    };

    return async team => {
        try {
            const projectList = await projectRepository.getAll();
            if(projectList instanceof Error) throw new Error(projectList.message);
            const listTeamProjects = await teamProjects(projectList, team);
            return listTeamProjects;
        }catch (err){
            throw err;
        }
    };
};