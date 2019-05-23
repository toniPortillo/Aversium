'use strict';
module.exports = userRepository => {
    const _roleValidation = role => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(role === "productOwner" || role === "scrumMaster" || role === "developer") resolve("Successful validation");
                else reject(new Error("Error: este rol no esta contemplado"));
            }, 0);
        });
    };

    return async (user, role) => {
        if(user === undefined || user.length === 0) throw new Error("Usuario vacio o no definido");
        if(role === undefined || role.length === 0) throw new Error("Rol vacio o no definido");
        try {
            const validation = await _roleValidation(role);
            if(validation !== "Successful validation") throw new Error(validation.message);
            if(user.role === role) throw new Error("Es el mismo rol que ya tiene");
            const modifiedUser = await userRepository.modifyRole(user._id, role);
            return modifiedUser;
        }catch(err) {
            throw err;
        }
    };
};