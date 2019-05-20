module.exports = (userEntity, encryptor, passwordComparer) => ({
    create: async (username, email, password, role) => {
        const query = { email };
        try {
            const foundUser = await userEntity.find(query);
            if(!foundUser.length) {
                const hash = await encryptor(password);
                userEntity.username = username;
                userEntity.email = email;
                userEntity.password = hash;
                userEntity.role = role;
                return await userEntity.save();
            } else throw new Error("Usuario ya existente");
        }catch(err) {
            throw err;
        };
    },
    getAll: async () => {
        const query = {};
        try {
            const list = await userEntity.find(query);
            if(list !== undefined) return list;
            throw new Error("Lista de usuarios no definida");
        }catch(err) {
            throw err;
        };
    },
    findOneByName: async username => {
        const query = {username: username};
        try {
            const foundUser = await userEntity.find(query);
            if(foundUser.length !== 0) return foundUser;
            throw new Error("Usuario no encontrado");
        }catch(err) {
            throw err;
        };
    },
    findOneById: async _id => {
        const query = {_id: _id};
        try {
            const foundUser = await userEntity.find(query);
            if(foundUser.length !== 0) return foundUser;
            throw new Error("Usuario no encontrado");
        }catch(err) {
            throw err;
        };
    },
    removeById: async _id => {
        const query = {_id: _id};
        try {
            const userDeleted = await userEntity.remove(query);
            return userDeleted;
        }catch(err) {
            throw err;
        };
    }
});