'use strict';
module.exports = (userEntity) => ({
    create: async (username, email, password, role) => {
        const query = { email };
        try {
            const foundUser = await userEntity.find(query);
            if(!foundUser.length) {
                userEntity.username = username;
                userEntity.email = email;
                userEntity.password = password;
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
    findOneByEmail: async email => {
        const query = {email: email};
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
    },
    modifyRole: async (_id, role) => {
        const query = {_id: _id};
        try {
            const modifiedUser = await userEntity.findOneAndUpdate(query, {role: role});
            return modifiedUser;
        }catch(err) {
            throw err;
        };
    },
    modifyPassword: async (_id, password) => {
        const query = {_id: _id};
        try {
            const modifiedUser = await userEntity.findOneAndUpdate(query, {password, password});
            return modifiedUser;
        }catch(err) {
            throw err
        };
    }
});