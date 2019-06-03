'use strict';
module.exports = (teamRepository, userRepository, checkTeamService) => {
    const _validateCreator = (team, creator) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(creator === undefined || creator.length === 0) reject(new Error("Creador vacio o no definido"));
                else if(team[0].creator[0]._id === creator[0]._id) resolve(team);
                reject(new Error("No puede modificar el equipo, por no ser su responsable"));
            }, 0);
        });
    };

    const _validateTeamCapacity = team => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(team[0].users.length < team[0].maxmembers) resolve(team);
                else reject(new Error("No se pudo añadir este usuario, por que supera la capacidad del equipo"));
            }, 0);
        });
    };

    return async (team, user, emailNewMember) => {
        if(team === undefined || team.length === 0) throw new Error("Equipo vacio o no definido");
        try {
            const validateCreator = await _validateCreator(team, user);
            if(validateCreator instanceof Error) throw new Error(validateCreator.message);
            const validateTeamCapacity = await _validateTeamCapacity(validateCreator);
            if(validateTeamCapacity instanceof Error) throw new Error(validateTeamCapacity.message);
            const newMember = userRepository.findOneByEmail(emailNewMember);
            if(newMember instanceof Error) throw new Error(newMember.message);
            const checkTeam = checkTeamService(validateTeamCapacity[0], newMember[0]);
            const validatedMember = await checkTeam();
            if(validatedMember instanceof Error) throw new Error(validatedMember.message);
            validateTeamCapacity[0].users.push(validatedMember);
            const modifiedTeam = await teamRepository.modifyUsers(validateTeamCapacity[0]._id, validateTeamCapacity[0].users);
            if(modifiedTeam instanceof Error) throw new Error(modifiedTeam.message);
            const resultingTeam = {
                team: modifiedTeam,
                message: "Usuario añadido con exito"
            };
            return resultingTeam;
        }catch(err) {
            throw err;
        };
    };
};