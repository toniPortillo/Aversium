'use strict';
module.exports = (userRepository, passwordComparer) => {
    return async (email, password) => {
        if(email === undefined || email.length === 0) throw new Error("Email vacio o no definido");
        if(password === undefined || password.length === 0) throw new Error("Password vacia o no definida");
        try {
            const user = await userRepository.findOneByEmail(email);
            if(user instanceof Error) throw new Error(user.message);
            const passwordValidation = await passwordComparer(password, user.password);
            if(!passwordValidation) throw new Error("Password incorrecta");
            return user;
        }catch(err) {
            throw err;
        }
    };
};