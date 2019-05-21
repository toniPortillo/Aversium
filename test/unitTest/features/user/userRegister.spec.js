'use strict';
const userRegister = require('../../../../actions/user/userRegister');

const mockUserRepositoryCreate = userToCreate => ({
    create: jest.fn(() => new Promise(resolve => resolve(userToCreate)))
});

describe('Action user', () => {
    describe('Metodo userRegister', () => {
        it('Debe crear un usuario, si todos los parametros estan correcto', async () => {
            expect.assertions(2);
            const userToCreate = {
                username: "username",
                email: "username@aversium.com",
                password: "hash",
                role: "productOwner"
            };
            const createdUser = {
                user: userToCreate,
                message: "Usuario creado exitosamente"
            };

            const userRepository = mockUserRepositoryCreate(userToCreate);
            const userAction = userRegister(userRepository);
            try {
                const user = await userAction(userToCreate);
                expect(user).toEqual(createdUser);
                expect(userRepository.create).toBeCalledWith(userToCreate.username, userToCreate.email, userToCreate.password, userToCreate.role);
            }catch(err) {
                throw err;
            }
        });
    });
});