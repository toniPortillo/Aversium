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

    return async (team, user, param) => {
        if(team === undefined) throw new Error("Equipo no definido");
        try {
            const modifyTeamValidated = await validateCreator(team, user);
            if(modifyTeamValidated instanceof Error) throw new Error(modifyTeamValidated.message);
            if(param instanceof Number) teamRepository.modifyMembersNumber(modifyTeamValidated[0]._id, param);
            else if(param instanceof Object) {
                
                teamRepository.modifyUsers(modifyTeamValidated[0]._id, param);
            }
        }catch(err) {
            throw err;
        };
    };
};