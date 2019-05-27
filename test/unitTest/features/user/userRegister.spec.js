'use strict';
const userRegister = require('../../../../actions/user/userRegister');

const mockUserRepositoryCreate = userToCreate => ({
    create: jest.fn(() => new Promise(resolve => resolve(userToCreate)))
});

const mockUserRepositoryCreateError = () => ({
    create: jest.fn(() => new Promise(resolve => resolve(new Error("Usuario ya existente"))))
});

const mockEncryptorFunction = (hash) => jest.fn(() => new Promise(resolve => resolve(hash)));
 
const mockEncryptorFunctionError = () => jest.fn(() => new Promise(resolve => resolve(new Error)));

describe('Action user', () => {
    describe('Metodo: userRegister', () => {
        it('Debe crear un usuario, si todos los parámetros estan correctos', async () => {
            expect.assertions(3);
            const password = "password";
            const hash = "hash";
            const userToCreate = {
                _id: "userId",
                username: "username",
                email: "username@aversium.com",
                password: password,
                role: "productOwner"
            };
            const encryptedUser = {
                _id: "userId",
                username: "username",
                email: "username@aversium.com",
                password: hash,
                role: "productOwner"
            };
            const createdUser = {
                user: encryptedUser,
                message: "Usuario creado exitosamente"
            };

            const userRepository = mockUserRepositoryCreate(encryptedUser);
            const encryptor = mockEncryptorFunction(hash);
            const userAction = userRegister(userRepository, encryptor);
            try {
                const user = await userAction(userToCreate);
                expect(user).toEqual(createdUser);
                expect(encryptor).toBeCalledWith(userToCreate.password);
                expect(userRepository.create).toBeCalledWith(userToCreate.username, userToCreate.email, hash, userToCreate.role);
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
        it('Debe devolver error de validación, si la validación del username es incorrecta', async () => {
            expect.assertions(2);
            const userToCreate = {
                _id: "userId",
                username: "",
                email: "usertocreate@aversium.com",
                password: "hash",
                role: "scrumMaster"
            };
            const userAction = userRegister();
            try {
                const user = await userAction(userToCreate);
            }catch(err) {
                expect(err.message).toEqual("Error: en el nombre de usuario");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error de validacion, si la validación de la password es incorrecta', async () => {
            expect.assertions(2);
            const userToCreate = {
                _id: "userId",
                username: "username",
                email: "usertocreate@aversium.com",
                password: undefined,
                role: "scrumMaster"
            };
            const userAction = userRegister();
            try {
                const user = await userAction(userToCreate);
            }catch(err) {
                expect(err.message).toEqual("Error: en la password de usuario");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si se produce error en la encriptación de la password', async () => {
            expect.assertions(3);
            const password = "password";
            const hash = "hash";
            const userToCreate = {
                username: "username",
                email: "usertocreate@aversium.com",
                password: password,
                role: "productOwner"
            };
            const userRepository = mockUserRepositoryCreate();
            const encryptor = mockEncryptorFunctionError();
            const userAction = userRegister(userRepository, encryptor);
            try {
                const user = await userAction(userToCreate);
            }catch(err) {
                expect(err.message).toEqual('Error al cifrar la password');
                expect(err instanceof Error).toBeTruthy();
                expect(encryptor).toBeCalledWith(password);
            };
        });
        it('Debe devolver error de validacion, si la validación del rol es incorrecta', async () => {
            expect.assertions(2);
            const userToCreate = {
                _id: "userId",
                username: "username",
                email: "usertocreate@aversium.com",
                password: "hash",
                role: ""
            };
            const userAction = userRegister();
            try {
                const user = await userAction(userToCreate);
            }catch(err) {
                expect(err.message).toEqual("Error: en el rol de usuario");
                expect(err instanceof Error).toBeTruthy();
            };
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
        it('Debe devolver error, si el usuario ya existe', async () => {
            expect.assertions(4);
            const password = "password";
            const userToCreate = {
                username: "username",
                email:"usertocreate@aversium.com",
                password: password,
                role: "scrumMaster"
            };
            const hash = "hash";
            const encryptedUser = {
                username: "username",
                email: "usertocreate@aversium.com",
                password: "hash",
                role: "scrumMaster"
            };
            const userRepository = mockUserRepositoryCreateError();
            const encryptor = mockEncryptorFunction(hash);
            const userAction = userRegister(userRepository, encryptor);
            try {
                const user = await userAction(userToCreate);
            }catch(err) {
                expect(err.message).toEqual("Usuario ya existente");
                expect(err instanceof Error).toBeTruthy();
                expect(encryptor).toBeCalledWith(userToCreate.password);
                expect(userRepository.create).toBeCalledWith(userToCreate.username, userToCreate.email,
                    hash, userToCreate.role);
            };
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
            };
        });
    });
});