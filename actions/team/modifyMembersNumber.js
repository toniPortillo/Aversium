'use strict';
module.exports = teamRepository => {
    const _validateCreator = (team, creator) => {
        return new Promise((resolve, rejects) => {
            setTimeout(() => {
                if(creator === undefined) reject(new Error("Creador no definido"));
                else if(team[0].creator[0]._id === creator._id) resolve(team);
                else reject(new Error("No puede modificar el equipo, por no ser su responsable"));
            }, 0);
        });
    };

    return async (teamID, user, maxMembers) => {
        if(team === undefined || team.length === 0) throw new Error("Equipo vacio o no definido");
        try {
            const foundTeam = await teamRepository.findOneById(teamID);
            if(foundTeam instanceof Error) throw new Error(foundTeam.message);
            const teamModificationValidator = await _validateCreator(foundTeam, user);
            if(teamModificationValidator instanceof Error) throw new Error(teamModificationValidator.message);
            const modifiedTeam = await teamRepository.modifyMembersNumber(teamModificationValidator[0]._id, maxMembers);
            if(modifiedTeam instanceof Error) throw new Error(modifiedTeam.message);
            const resultingTeam = {
                team: modifiedTeam,
                message: "Equipo modificado exitosamente"
            };
            return resultingTeam;
        }catch(err) {
            throw err;
        };
    };
};