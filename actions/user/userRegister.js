'use strict';
module.exports = userRepository => {
    const _validations = userToCreate => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(userToCreate.username === undefined || typeof userToCreate.username !== 'string')
                reject(new Error("Error: en el nombre de usuario"));
                else if(userToCreate.email === undefined || typeof userToCreate.email !== 'string')
                reject(new Error("Error: en el email de usuario"));
                else if(userToCreate.password === undefined || typeof userToCreate.password !== 'string')
                reject(new Error("Error: en la password de usuario"));
                else if(userToCreate.role === undefined || typeof userToCreate.role !== 'string')
                reject(new Error("Error: en el rol de usuario"));
                else resolve("Successful validation");
            }, 0);
        });
    };

    return async userToCreate => {
        if(userToCreate === undefined || userToCreate.length === 0) throw new Error("Usuari vacio");
        try {
            const validation = await _validations(userToCreate);
            if(validation !== "Successful validation") throw new Error(validation.message);
            const user = await userRepository.create(userToCreate.username, userToCreate.email, userToCreate.password, userToCreate.role);
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