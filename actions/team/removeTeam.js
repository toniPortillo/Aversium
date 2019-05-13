'use strict';
module.exports = teamRepository => {
    const validateCreator = (team, creator) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(creator === undefined) reject(new Error("Creador no definido"));
                if(team.creator[0]._id === creator[0]._id) resolve(team);
                reject(new Error("No puede eliminar el equipo, por no ser su responsable"));
            }, 0);
        });
    }

    return async (team, creator) => {
        if(team === undefined) throw new Error("Equipo no definido");
        try {
            const removeTeamValidated = await validateCreator(team, creator);
            if(removeTeamValidated instanceof Error) throw new Error(removeTeamValidated.message);
            const teamDeleted = await teamRepository.removeById(removeTeamValidated[0]._id);
            if(teamDeleted instanceof Error) throw new Error(teamDeleted.message);
            const teamRemoved = {
                team: teamRemoved,
                message: "Equipo eliminado exitosamente"
            }
            return teamRemoved;
        }catch(err) {
            throw err;
        };
    };
};