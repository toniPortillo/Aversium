'use strict';

let deleteUsersTeam = (users, user) => {
    let userArray = [];
    users.forEach((item) => {
        return new Promise((resolve) => {
            if(item.username !== user.username) {
                resolve(userArray.push(item));
            }
        });
    });
    return userArray;
};

module.exports = deleteUsersTeam;