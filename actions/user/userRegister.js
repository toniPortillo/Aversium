'use strict';
module.exports = (userRepository, encryptor) => {
    const _validations = userToCreate => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(userToCreate.username === undefined || typeof userToCreate.username !== 'string' 
                || userToCreate.username.length === 0)
                reject(new Error("Error: en el nombre de usuario"));
                else if(userToCreate.email === undefined || typeof userToCreate.email !== 'string' 
                || userToCreate.email.length === 0)
                reject(new Error("Error: en el email de usuario"));
                else if(userToCreate.password === undefined || typeof userToCreate.password !== 'string' 
                || userToCreate.password.length === 0)
                reject(new Error("Error: en la password de usuario"));
                else if(userToCreate.role === undefined || typeof userToCreate.role !== 'string' 
                || userToCreate.role.length === 0)
                reject(new Error("Error: en el rol de usuario"));
                else resolve("Successful validation");
            }, 0);
        });
    };

    const _roleValidation = role => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(role === "productOwner" || role === "scrumMaster" || role === "developer") resolve("Successful validation");
                else reject(new Error("Error: este rol no esta contemplado"));
            }, 0);
        });
    };

    return async userToCreate => {
        if(userToCreate === undefined || userToCreate.length === 0) throw new Error("Usuario vacio o no definido");
        try {
            const validation = await _validations(userToCreate);
            if(validation !== "Successful validation") throw new Error(validation.message);
            const roleValidation = await _roleValidation(userToCreate.role)
            if(roleValidation !== "Successful validation") throw new Error(roleValidation.message);
            const hash = await encryptor(userToCreate.password);
            if(hash instanceof Error) throw new Error('Error al cifrar la password');
            const user = await userRepository.create(userToCreate.username, userToCreate.email, hash, userToCreate.role);
            if(user.message === "Usuario ya existente") throw new Error(user.message);
            const createdUser = {
                user: user,
                message: "Usuario creado exitosamente"
            };
            return createdUser;
        }catch(err) {
            throw err;
        };
    };
};