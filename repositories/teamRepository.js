'use strict';
module.exports = teamEntity => ({
    create: async (teamname, creator, maxmembers) => {
        const query = {teamname: teamname};
        const teamFound = await teamEntity.find(query);
        try {
            if(!teamFound.length) {
                let saveTeam = new teamEntity({
                    teamname: teamname,
                    creator: creator,
                    maxmembers: maxmembers,
                    users: creator
                });
                return await saveTeam.save();
            }
        }catch(err) {
            throw new Error("Equipo ya existente");
        };
    },
    getAll: async () => {
        try {
            const query = {};
            const list = await teamEntity.find(query);

            if(list !== undefined) return list;
            throw new Error("Lista de equipos no definida");
        }catch(err) {
            throw err;
        }
    }
});