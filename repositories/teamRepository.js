'use strict';
module.exports = teamEntity => ({
    create: async () => {

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