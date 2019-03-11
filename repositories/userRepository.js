module.exports = (userEntity) => ({
    create: async (username, email, password, role) => {
        const query = { email };
        const userFound = await userEntity.find(query);

        if(!userFound.length) {

            return await userEntity.save(username,
                email,
                password,
                role);
        } else {    
            throw new Error("Usuario ya existente");
        }
    }
});