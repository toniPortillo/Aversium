'use strict';
module.exports = (userRepository, passwordComparer, encryptor) => {
    return async (user, oldPassword, newPassword) => {
        if(user === undefined || user.length === 0) throw new Error("Usuario vacio o no definido");
        if(oldPassword === undefined || oldPassword.length === 0) throw new Error("Password actual vacia o no definida");
        if(newPassword === undefined || newPassword.length === 0) throw new Error("Password nueva vacia o no definida");
        try {
            const validateOldPassword = await passwordComparer(oldPassword, user.password);
            if(!validateOldPassword) throw new Error("Error al introducir la password actual");
            const newHash = await encryptor(newPassword);
            if(newHash instanceof Error) throw new Error("Error al cifrar la nueva password");
            const modifiedUser = await userRepository.modifyPassword(user._id, newHash);
            if(modifiedUser instanceof Error) throw new Error("Error al modificar la password");
            return modifiedUser;
        }catch(err) {
            throw err;
        }
    };
};