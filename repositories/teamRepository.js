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
        };
    },
    findOneByName: async teamname => {
        const query = {teamname: teamname};
        try {
            const teamFound = await teamEntity.find(query);
            if(teamFound.length !== 0) return teamFound;
            throw new Error("Equipo no encontrado");
        }catch(err) {
           throw err; 
        };
    },
    findOneById: async _id => {
        const query = {_id: _id};
        try {
            const teamFound = await teamEntity.find(query);
            if(teamFound.length !== 0) return teamFound;
            throw new Error("Equipo no encontrado");
        }catch(err) {
            throw err;
        };
    },
    removeById: async _id => {
        const query = {_id: _id};
        try {
            const deletedTeam = await teamEntity.remove(query);
            return deletedTeam;
        }catch(err) {
            throw err;
        }
    },
    modifyUsers: async (_id, users) => {
        const query = {_id: _id};
        try{
            const modifiedTeam = await teamEntity.findOneAndUpdate(query, {users: users});
            return modifiedTeam;
        }catch(err) {
            throw err;
        }
    },
    modifyMembersNumber: async (_id, membersNumber) => {
        const query = {_id: _id};
        try {
            const modifiedTeam = await teamEntity.findOneAndUpdate(query, {maxmembers: membersNumber});
            return modifiedTeam;
        }catch(err) {
            throw err;
        }
    }
});