'use strict';
module.exports = teamRepository => {
    const _validations = (teamToCreate) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(teamToCreate.teamname === undefined || typeof teamToCreate.teamname !== 'string')
                reject(new Error("Error: en el nombre del equipo"));
                else if(teamToCreate.creator === undefined || typeof teamToCreate.creator !== 'object')
                reject(new Error("Error: en el creador del equipo"));
                else if(teamToCreate.maxmembers === undefined || typeof teamToCreate.maxmembers !== 'number')
                reject(new Error("Error: en el número máximo de miembros del equipo"));
                else {
                    const message = "Successful validation";
                    resolve(message);
                }
            },0);
        })
    };
    
    return async (teamToCreate, user) => {
        try {
            if(teamToCreate === undefined || teamToCreate.length === 0) throw new Error("Equipo vacio");
            const validation = await _validations(teamToCreate);
            if(validation !== "Successful validation") throw new Error("Equipo no valido");
            const team = await teamRepository.create(teamToCreate.teamname, user, teamToCreate.maxmembers);
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