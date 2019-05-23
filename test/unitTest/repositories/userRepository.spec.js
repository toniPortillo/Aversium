const createUserRepository = require('../../../repositories/userRepository');

const mockUserEntitySuccess = (userToCreate, createdUser) => ({
    find: jest.fn(() => new Promise((resolve) => resolve([]))),
    save: jest.fn(() => new Promise((resolve) => resolve(createdUser)))
});

const mockUserEntityFind = userList => ({
    find: jest.fn(() => new Promise(resolve => resolve(userList)))
});

const mockEncryptorFunction = jest.fn().mockImplementation(hash => () => new Promise(resolve => resolve(hash)));

const mockUserEntityRemove = userToRemove => ({
    remove: jest.fn(() => new Promise(resolve => resolve(userToRemove)))
});

const mockUserEntityFindOneAndUpdate = modifyUser => ({
    findOneAndUpdate: jest.fn(() => new Promise(resolve => resolve(modifyUser)))
});

describe('Repositorio: User', () => {
    describe('Metodo: create', () => {
        it('Debe crear un usuario, si este no existe', async () => {
            expect.assertions(2);
            const userToCreate = {
                username: 'USERNAME',
                email: 'createduser@aversium.com',
                password: 'PASSWORD',
                role: 'productOwner'
            };
            const hash = "ASDLKAJDOAIJDLAISDJ";
            const createdUser = {
                _id: "createdUserId",
                username: 'USERNAME',
                email: 'createduser@aversium.com',
                password: hash,
                role: 'productOwner'
            };

            const userEntity = mockUserEntitySuccess(userToCreate, createdUser);
            const userRepository = createUserRepository(userEntity, mockEncryptorFunction(hash));
            try {
                const user = await userRepository.create(userToCreate.username, userToCreate.email, userToCreate.password, userToCreate.role);
    
                expect(user).toEqual(createdUser);
                expect(userEntity.find).toBeCalledWith({ email: userToCreate.email });
            }catch(err) {
                throw err;
            }
        });
        it('Debe devolver un error, si el usuario ya existe', async () => {
            expect.assertions(2);
            const userExist = [{
                _id: "userExistId"
            }];
            const userEntity = mockUserEntityFind(userExist);
            const userRepository = createUserRepository(userEntity);
            try {
                const user = await userRepository.create();
            }catch(err) {
                expect(err.message).toEqual("Usuario ya existente");
                expect(err instanceof Error).toBeTruthy();
            };
        });
    });

    describe('Metodo: getAll', () => {
        it('Debe rellenar un array con los usuarios', async () => {
            expect.assertions(2);
            user1 = {};
            user2 = {};
            const userListToFind = [
                user1,
                user2
            ];
            const userEntity = mockUserEntityFind(userListToFind);
            const userRepository = createUserRepository(userEntity);
            try {
                const userList = await userRepository.getAll();
                expect(userList).toEqual(userListToFind);
                expect(userEntity.find).toBeCalledWith({});
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver un error, si la lista de usuarios no esta definida', async () => {
            expect.assertions(2);
            const userListToFind = undefined;
            const userEntity = mockUserEntityFind(userListToFind);
            const userRepository = createUserRepository(userEntity);
            try {
                const userList = await userRepository.getAll();
            }catch(err) {
                expect(err.message).toEqual("Lista de usuarios no definida");
                expect(err instanceof Error).toBeTruthy();
            };
        });
    });

    describe('Metodo: findOneByEmail', () => {
        it('Debe devolver el usuario, si lo encuentra por el email', async () => {
            expect.assertions(2);
            const email = "";
            const userToFound = {
                _id: "useremail@aversium.com",
                username: "USERNAME",
                email: "useremail@aversium.com",
                password: "hash",
                role: "productOwner"
            }
            const userEntity = mockUserEntityFind(userToFound);
            const userRepository = createUserRepository(userEntity);
            try {
                const foundUser = await userRepository.findOneByEmail(email);
                expect(foundUser).toEqual(userToFound);
                expect(userEntity.find).toBeCalledWith({email: email});
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver un error, sino encuentra el usuario por el email', async () => {
            expect.assertions(2);
            const email = "useremail@aversium.com";
            const userToFound = [];
            const userEntity = mockUserEntityFind(userToFound);
            const userRepository = createUserRepository(userEntity);
            try {
                const foundUser = await userRepository.findOneByEmail(email);
            }catch(err) {
                expect(err.message).toEqual("Usuario no encontrado");
                expect(err instanceof Error).toBeTruthy();
            };
        });
    });

    describe('Metodo: findOneById', () => {
        it('Debe devolver el usuario, si lo encuentra por el id', async () => {
            expect.assertions(2);
            const _id = "userId";
            const userToFound = {
                _id: "userId",
                username: "USERNAME",
                email: "useremail@aversium.com",
                password: "hash",
                role: "scrumMaster"
            };
            const userEntity = mockUserEntityFind(userToFound);
            const userRepository = createUserRepository(userEntity);
            try {
                const foundUser = await userRepository.findOneById(_id);
                expect(foundUser).toEqual(userToFound);
                expect(userEntity.find).toBeCalledWith({_id: _id});
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver un error, sino encuentra el usuario por el id', async () => {
            expect.assertions(2);
            const _id = "userId";
            const userToFound = [];
            const userEntity = mockUserEntityFind(userToFound);
            const userRepository = createUserRepository(userEntity);
            try {
                const foundUser = await userRepository.findOneById(_id);
            }catch(err) {
                expect(err.message).toEqual("Usuario no encontrado");
                expect(err instanceof Error).toBeTruthy();
            };
        });
    });

    describe('Metodo: removeById', () => {
        it('Debe eliminar el usuario, si lo encuentra por el id', async () => {
            expect.assertions(2);
            const _id = "userId";
            const userToRemove = {
                _id: "userId",
                username: "USERNAME",
                email: "usertoremove@aversium.com",
                password: "hash",
                role: "developer"
            };

            const userEntity = mockUserEntityRemove(userToRemove);
            const userRepository = createUserRepository(userEntity);
            try {
                const userDeleted = await userRepository.removeById(_id);
                expect(userDeleted).toEqual(userToRemove);
                expect(userEntity.remove).toBeCalledWith({_id: _id});
            }catch(err) {
                throw err;
            }
        });   
    });

    describe('Metodo: modifyRole', () => {
        it('Debe modificar el rol de usuario, si lo encuentra por el id', async () => {
            expect.assertions(2);
            const role = "scrumMaster";
            const userToModify = {
                _id: "userId",
                username: "username",
                email: "usertomodify@aversium.com",
                password: "hash",
                role: "developer"
            };
            const modifiedUser = {
                _id: "userId",
                username: "username",
                email: "usertomodify@aversium.com",
                password: "hash",
                role: role
            };
            const userEntity = mockUserEntityFindOneAndUpdate(modifiedUser);
            const userRepository = createUserRepository(userEntity);
            try {
                const user = await userRepository.modifyRole(userToModify._id, role);
                expect(user).toEqual(modifiedUser);
                expect(userEntity.findOneAndUpdate).toBeCalledWith( {_id: userToModify._id}, {role: role});
            }catch(err) {
                throw err;
            }
        });
    });

    describe('Metodo: modifyPassword', () => {
        it('Debe modificar la password de usuario, si lo encuentra por el id', async () => {
            expect.assertions(2);
            expect.assertions(2);
            const password = "hash"
            const userToModify = {
                _id: "userId",
                username: "username",
                email: "usertomodify@aversium.com",
                password: "password",
                role: "developer"
            };
            const modifiedUser = {
                _id: "userId",
                username: "username",
                email: "usertomodify@aversium.com",
                password: password,
                role: "scrumMaster"
            };
            const userEntity = mockUserEntityFindOneAndUpdate(modifiedUser);
            const userRepository = createUserRepository(userEntity);
            try {
                const user = await userRepository.modifyPassword(userToModify._id, password);
                expect(user).toEqual(modifiedUser);
                expect(userEntity.findOneAndUpdate).toBeCalledWith( {_id: userToModify._id}, {password: password});
            }catch(err) {
                throw err;
            }
        });
    });
});
