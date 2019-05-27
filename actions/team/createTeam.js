'use strict';
module.exports = teamRepository => {
    const _validations = (teamToCreate) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(teamToCreate.teamname === undefined || typeof teamToCreate.teamname !== 'string' 
                || teamToCreate.teamname.length === 0)
                reject(new Error("Error: en el nombre del equipo"));
                else if(teamToCreate.creator === undefined || typeof teamToCreate.creator !== 'object' 
                || teamToCreate.creator.length === 0)
                reject(new Error("Error: en el creador del equipo"));
                else if(teamToCreate.maxmembers === undefined || typeof teamToCreate.maxmembers !== 'number' 
                || teamToCreate.maxmembers.length === 0)
                reject(new Error("Error: en el número máximo de miembros del equipo"));
                else {
                    const message = "Successful validation";
                    resolve(message);
                }
            },0);
        })
    };
    
    const _greatherThanZero = maxmembers => {
        let greatherThanZero = maxmembers;
        if(maxmembers < 1) greatherThanZero = 1;
        return greatherThanZero;
    };

    return async (teamToCreate, user) => {
        if(teamToCreate === undefined || teamToCreate.length === 0) throw new Error("Equipo vacio");
        if(user === undefined || user.length === 0) throw new Error("Creador vacio");
        try {
            const validation = await _validations(teamToCreate);
            if(validation !== "Successful validation") throw new Error("Equipo no valido");
            const greatherThanZero = _greatherThanZero(teamToCreate.maxmembers);
            const team = await teamRepository.create(teamToCreate.teamname, user, greatherThanZero);
            if(team.message === "Equipo ya existente") throw new Error("Equipo ya existente");
            const teamCreated = {
                team: team,
                message: "Equipo creado exitosamente"
            };
            return teamCreated;
        }catch(err) {
            throw err;
        }
    };
};