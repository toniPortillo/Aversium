'use strict';
module.exports = (team, newMember)=> {
    let availableMembers = team.maxmembers - team.users.length;
    let productOwner = 0;
    let scrumMaster = 0;
    let developer = 0;
    let availableDevelopers = availableMembers - 2;
    
    const setProductOwner = usersTeam => {
        return new Promise(resolve => {
            if(usersTeam.length === 0) resolve(productOwner);
            setTimeout(() => {
                usersTeam.forEach(userTeam => {
                    if(userTeam.role === 'productOwner') {
                        availableDevelopers = availableDevelopers + 1;
                        resolve(productOwner = 1); 
                    };
                });
            }, 0);
            resolve(productOwner)
        });
    };
    
    const setScrumMaster = usersTeam => {
        return new Promise(resolve => {
            if(usersTeam.length === 0) resolve(scrumMaster);
            setTimeout(() => {
                usersTeam.forEach(userTeam => {
                    if(userTeam.role === 'scrumMaster') {
                        availableDevelopers = availableDevelopers + 1;
                        resolve(scrumMaster = 1);
                    };
                });
            }, 0);
            resolve(scrumMaster);
        });
    };

    const setDeveloper = (usersTeam, user) => {
        return new Promise(resolve => {
            if(usersTeam.length === 0) resolve(developer);
            setTimeout(() => {
                usersTeam.forEach(userTeam => {
                    if(userTeam.email === user.email) resolve(developer = 1);
                });
            }, 0);
            resolve(developer);
        });
    };

    const newProductOwner = () => {
        return new Promise((resolve, reject) => {
            if(availableDevelopers > 0) {
                if(productOwner === 0) resolve(newMember);
                reject(new Error("Ya existe product owner en el equipo"));
            }else reject(new Error("No existe hueco en el equipo"));
        });
    };

    const newScrumMaster = () => {
        return new Promise((resolve, reject) => {
            if(availableDevelopers > 0) {
                if(scrumMaster === 0) resolve(newMember);
                reject(new Error("Ya existe scrum master en el equipo"));
            }else reject(new Error("No existe hueco en el equipo"));
        });
    };

    const newDeveloper = () => {
        return new Promise((resolve, reject) => {
            if(availableDevelopers > 0) {
                if(developer === 0) resolve(newMember);
                reject(new Error("Este desarrollador ya esta en el equipo"));
            }else reject(new Error("No existe hueco en el equipo"));
        })
    };
    
    const checkFactory = async () => {
        try {
            if(newMember === undefined) throw new Error("Usuario no definido");
            else if(newMember.role === 'productOwner') return await newProductOwner();
            else if(newMember.role === 'scrumMaster') return await newScrumMaster();
            else if(newMember.role === 'developer') return await newDeveloper();
            else throw new Error('No es ningún rol permitido');
        }catch(err) {
            throw err;
        };
    };

    return async () => {
        try {
            await setProductOwner(team.users);
            await setScrumMaster(team.users);
            await setDeveloper(team.users, newMember);
            return await checkFactory();
        }catch(err) {
            throw err;            
        }
    };
};