module.exports = (userEntity, encryptor, passwordComparer) => ({
    create: async (username, email, password, role) => {
        const query = { email };
        const foundUser = await userEntity.find(query);

        try {
            const hash = await encryptor(password);
            if(!foundUser.length) {
                userEntity.username = username;
                userEntity.email = email;
                userEntity.password = hash;
                userEntity.role = role;
                return await userEntity.save();
            } else throw new Error("Usuario ya existente");
        }catch(err) {
            throw err;
        };
    }
});