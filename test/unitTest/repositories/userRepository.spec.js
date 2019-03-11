const createUserRepository = require('../../../repositories/userRepository');

const mockUserEntitySuccess = (userCreated) => ({
    find: jest.fn(() => new Promise((resolve) => resolve([]))),
    save: jest.fn(() => new Promise((resolve) => resolve(userCreated)))
})

describe('Repository: User', () => {
    describe('Create method', () => {
        it('should create user if it not exists', async () => {
            const userToCreate  = {
                username: 'USERNAME',
                email: 'EMAIL',
                password: 'PASSWORD',
                role: 'ADMIN'
            };
            const userEntity = mockUserEntitySuccess(userToCreate);
            const userRepository = createUserRepository(userEntity);
            const user = await userRepository.create(userToCreate.username, userToCreate.email, userToCreate.password, userToCreate.role);

            expect(userEntity.find).toBeCalledWith({ email: userToCreate.email });
            expect(user).toEqual(userToCreate);
        });
    });
});
