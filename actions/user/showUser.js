'use strict';
module.exports = userRepository => {
    return async _id => {
        if(_id === undefined || _id.length === 0) throw new Error("Id vacio o no definido");
        try {
            const user = await userRepository.findOneById(_id);
            if(user instanceof Error) throw new Error(user.message);
            return user;
        }catch(err) {
            throw err;
        }
    };  
};