const createUserRepository = require('../../../repositories/userRepository');

const mockUserEntitySuccess = (userToCreate, createdUser) => ({
    find: jest.fn(() => new Promise((resolve) => resolve([]))),
    save: jest.fn(() => new Promise((resolve) => resolve(createdUser)))
});

const mockUserEntityFind = userList => ({
    find: jest.fn(() => new Promise(resolve => resolve(userList)))
});

const mockEncryptorFunction = jest.fn().mockImplementation(hash => () => new Promise(resolve => resolve(hash)));

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
    describe('Metodo: findOneByName', () => {
        it('Debe devolver el usuario, si lo encuentra por el nombre', async () => {
            expect.assertions(2);
            const username = "USERNAME";
            const userToFound = {
                _id: "userId",
                username: "USERNAME",
                email: "useremail@aversium.com",
                password: "hash",
                role: "productOwner"
            }
            const userEntity = mockUserEntityFind(userToFound);
            const userRepository = createUserRepository(userEntity);
            try {
                const foundUser = await userRepository.findOneByName(username);
                expect(foundUser).toEqual(userToFound);
                expect(userEntity.find).toBeCalledWith({username: username});
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver un error, sino encuentra el usuario por el nombre', async () => {
            expect.assertions(2);
            const username = "USERNAME";
            const userToFound = [];
            const userEntity = mockUserEntityFind(userToFound);
            const userRepository = createUserRepository(userEntity);
            try {
                const foundUser = await userRepository.findOneByName(username);
            }catch(err) {
                expect(err.message).toEqual("Usuario no encontrado");
                expect(err instanceof Error).toBeTruthy();
            };
        });
    });
});
