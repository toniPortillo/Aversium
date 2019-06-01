'use strict';
module.exports = teamRepository => {
    const _validateCreator = (team, creator) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(creator === undefined) reject(new Error("Creador no definido"));
                else if(team[0].creator[0]._id === creator[0]._id) resolve(team);
                else reject(new Error("No puede modificar el equipo, por no ser su responsable"));
            }, 0);
        });
    };

    const _validateMaxMembers = (team, maxMembers) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(team[0].users.length > maxMembers) reject(new Error("Existe ya un número mayor de miembros, de los que quiere restringir"));
                else if(team[0].users.length === maxMembers) reject(new Error("El número de miembros es igual, a los que quiere restringir"));
                else resolve(team);
            }, 0);
        });
    };

    return async (teamID, user, maxMembers) => {
        if(teamID === undefined || teamID.length === 0) throw new Error("Id de equipo vacia o no definida");
        try {
            const foundTeam = await teamRepository.findOneById(teamID);
            if(foundTeam instanceof Error) throw new Error(foundTeam.message);
            const validateCreator = await _validateCreator(foundTeam, user);
            if(validateCreator instanceof Error) throw new Error(validateCreator.message);
            const validateMaxMembers = await _validateMaxMembers(validateCreator, maxMembers);
            if(validateMaxMembers instanceof Error) throw new Error(validateMaxMembers.message)
            const modifiedTeam = await teamRepository.modifyMembersNumber(validateMaxMembers[0]._id, maxMembers);
            if(modifiedTeam instanceof Error) throw new Error(modifiedTeam.message);
            const resultingTeam = {
                team: modifiedTeam,
                message: "Numero máximo de miembros cambiado"
            };
            return resultingTeam;
        }catch(err) {
            throw err;
        };
    };
};