'use strict';
module.exports = teamRepository => {
    const validateCreator = (team, creator) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(creator === undefined) reject(new Error("Creador no definido"));
                else if(team[0].creator[0]._id === creator[0]._id) resolve(team);
                reject(new Error("No puede eliminar el equipo, por no ser su responsable"));
            }, 0);
        });
    };

    return async (teamID, user) => {
        if(teamID === undefined) throw new Error("Id de equipo no definido");
        try {
            const foundTeam = await teamRepository.findOneById(teamID);
            if(foundTeam instanceof Error) throw new Error(foundTeam.message);
            const removeTeamValidated = await validateCreator(foundTeam, user);
            if(removeTeamValidated instanceof Error) throw new Error(removeTeamValidated.message);
            const teamDeleted = await teamRepository.removeById(removeTeamValidated[0]._id);
            if(teamDeleted instanceof Error) throw new Error(teamDeleted.message);
            const teamRemoved = {
                team: teamDeleted,
                message: "Equipo eliminado exitosamente"
            };
            return teamRemoved;
        }catch(err) {
            throw err;
        };
    };
};