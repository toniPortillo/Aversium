'use strict';

let deleteUsersTeam = (users, user, creator) => {
    
    let userArray = [];
    return new Promise((resolve, reject) => {
        
        let err = "";
        if(user === undefined) {
            
            err = 'El usuario introducido para ser eliminado del equipo, no existe';
            reject(err);
        }
        if(user.email === creator.email) {

            err = "No se puede eliminar el creador del equipo";
            reject(err); 
        }
        users.forEach((item) => {
            
            if(item.email != user.email) {
       
                userArray.push(item);
            }
        });
       
        resolve(userArray);
    });
};

module.exports = deleteUsersTeam;