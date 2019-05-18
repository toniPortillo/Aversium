'use strict';
module.exports = (teamRepository, checkTeamService) => {
    const validateCreator = (team, creator) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(creator === undefined) reject(new Error("Creador no definido"));
                else if(team[0].creator[0]._id === creator[0]._id) resolve(team);
                reject(new Error("No puede modificar el equipo, por no ser su responsable"));
            }, 0);
        });
    };

    return async (team, user, newMember) => {
        if(team === undefined) throw new Error("Equipo no definido");
        try {
            const modifyTeamValidated = await validateCreator(team, user);
            if(modifyTeamValidated instanceof Error) throw new Error(modifyTeamValidated.message);
            const checkTeam = checkTeamService(team[0], user [0])
        }catch(err) {
            throw err;
        };
    };
};