'use strict';
const userRegister = require('../../../../actions/user/userRegister');

const mockUserRepositoryCreate = userToCreate => ({
    create: jest.fn(() => new Promise(resolve => resolve(userToCreate)))
});

describe('Action user', () => {
    describe('Metodo: userRegister', () => {
        it('Debe crear un usuario, si todos los parámetros estan correcto', async () => {
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
        it('Debe devolver errores de validación, si algún parámetro es incorrecto', async () => {
            expect.assertions(2);
            const userToCreate = {
                username: "username",
                email: 5,
                password: "hash",
                role: "developer"
            };

            const userRepository = mockUserRepositoryCreate(userToCreate);
            const userAction = userRegister(userRepository);
            try {
                const user = await userAction(userToCreate);
            }catch(err) {
                expect(err.message).toEqual("Error: en el email de usuario");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error de validación de rol, si el rol es incorrecto', async () => {
            expect.assertions(2);
            const userToCreate = {
                username: "username",
                email: "username@aversium.com",
                password: "hash",
                role: "error"
            };

            const userRepository = mockUserRepositoryCreate(userToCreate);
            const userAction = userRegister(userRepository);
            try {
                const user = await userAction(userToCreate);
            }catch(err) {
                expect(err.message).toEqual("Error: este rol no esta contemplado");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el usuario no esta definido', async () => {
            expect.assertions(2);
            const userToCreate = undefined;

            const userRepository = mockUserRepositoryCreate(userToCreate);
            const userAction = userRegister(userRepository);
            try {
                const user = await userAction(userToCreate);
            }catch(err) {
                expect(err.message).toEqual("Usuario vacio o no definido");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el usuario esta vacio', async () => {
            expect.assertions(2);
            const userToCreate = [];

            const userRepository = mockUserRepositoryCreate(userToCreate);
            const userAction = userRegister(userRepository);
            try {
                const user = await userAction(userToCreate);
            }catch(err) {
                expect(err.message).toEqual("Usuario vacio o no definido");
                expect(err instanceof Error).toBeTruthy();
            }
        });
    });
});