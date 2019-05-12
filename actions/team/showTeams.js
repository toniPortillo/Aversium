'use strict';
module.exports = teamRepository => {
    return async () => {
        try {
            const teamList = await teamRepository.getAll();
            if(teamList instanceof Error) throw new Error("Lista de equipos no definida");
            return teamList;
        }catch(err) {
            throw err;
        }
    };
};