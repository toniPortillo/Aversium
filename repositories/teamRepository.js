'use strict';
module.exports = teamEntity => ({
    create: async (teamname, creator, maxmembers) => {
        const query = {teamname: teamname};
        try {
            const teamFound = await teamEntity.find(query);
            if(!teamFound.length) {
                teamEntity.teamname = teamname;
                teamEntity.creator = creator;
                teamEntity.maxmembers = maxmembers;
                teamEntity.users = creator;
                
                return await teamEntity.save();
            }
            throw new Error("Equipo ya existente");
        }catch(err) {
            throw err;
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