'use strict';

let deleteUsersTeam = (users, user) => {
    
    let userArray = [];
    return new Promise(resolve => {
        
        if(user === undefined) {
            
            let err = "El usuario no existe";
            reject(err);
        }
        users.forEach((item) => {
       
            if(item.email !== user.email) {
       
                userArray.push(item);
            }
        });
       
        resolve(userArray);
    });
};

module.exports = deleteUsersTeam;