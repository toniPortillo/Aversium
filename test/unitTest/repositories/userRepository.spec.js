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
    });
});
