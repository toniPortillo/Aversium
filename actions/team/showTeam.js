'use strict';
module.exports = teamRepository => {
    const validateUser = (team, user) => {
        return new Promise((resolve, reject) => {
            let validate = false;
            if(team === undefined || user === undefined) reject(new Error("Equipo o usuario no definidos"));
            setTimeout(() => {
                team[0].users.map(userTeam => {
                    if(userTeam._id === user._id) validate = true;
                });
                if(validate) resolve(team);
                reject(new Error("El usuario no pertenece al equipo"));
            }, 0);
        })
    };
    
    return async (teamId, user) => {
        if(teamId === undefined) throw new Error("Id de equipo no definido");
        try {
            const team = await teamRepository.findOneById(teamId);
            if(team instanceof Error) throw new Error(team.message);
            const showTeamValidated = await validateUser(team, user);
            if(showTeamValidated instanceof Error) throw new Error(showTeamValidated.message);
            return showTeamValidated;
        }catch(err) {
            throw err;
        };
    };
};