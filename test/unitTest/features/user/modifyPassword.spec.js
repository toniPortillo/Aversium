'use strict';
const modifyPassword = require('../../../../actions/user/modifyPassword');

const mockUserRepositoryModifyPassword = modifiedUser => ({
    modifyPassword: jest.fn(() => new Promise(resolve => resolve(modifiedUser)))
});

const mockUserRepositoryModifyPasswordError = () => ({
    modifyPassword: jest.fn(() => new Promise(resolve => resolve(new Error)))
});

const mockPasswordComparer = () => jest.fn(() => new Promise(resolve => resolve(true)));

const mockPasswordComparerFalse = () => jest.fn(() => new Promise(resolve => resolve(false)));

const mockEncryptor = hash => jest.fn(() => new Promise(resolve => resolve(hash)));

const mockEncryptorError = () => jest.fn(() => new Promise(resolve => resolve(new Error)));

describe('Action user', () => {
    describe('Metodo: modifyPassword', () => {
        it('Debe modificar la password del usuario, si todo esta correcto', async () => {
            expect.assertions(4);
            const oldPassword = "password";
            const oldHash = "oldHash";
            const userToModify = {
                _id: "userId",
                username: "username",
                email: "userToModify@aversium.com",
                password: oldHash,
                role: "developer"
            };
            const newPassword = "noHash";
            const hash = "hash";
            const modifiedUser = {
                _id: "userId",
                username: "username",
                email: "userToModify@aversium.com",
                password: hash,
                role: "developer"
            };

            const userRepository = mockUserRepositoryModifyPassword(modifiedUser);
            const passwordComparer = mockPasswordComparer();
            const encryptor = mockEncryptor(hash);
            const userAction = modifyPassword(userRepository, passwordComparer, encryptor);
            try {
                const user = await userAction(userToModify, oldPassword, newPassword);
                expect(user).toEqual(modifiedUser);
                expect(userRepository.modifyPassword).toBeCalledWith(userToModify._id, hash);
                expect(encryptor).toBeCalledWith(newPassword);
                expect(passwordComparer).toBeCalledWith(oldPassword, userToModify.password);
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver error, si el usuario esta vacio o no definido', async () => {
            expect.assertions(2);
            const userToModify = undefined;
            const newPassword = "newPassword";
            const oldPassword = "oldPassword";
            const userAction = modifyPassword();
            try {
                const user = await userAction(userToModify, oldPassword, newPassword);
            }catch(err) {
                expect(err.message).toEqual("Usuario vacio o no definido");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si la password actual esta vacia o no definida', async () => {
            expect.assertions(2);
            const oldPassword = "";
            const oldHash = "oldHash";
            const newPassword = "newPassword"
            const userToModify = {
                _id: "userId",
                username: "username",
                email: "userToModify@aversium.com",
                password: oldHash,
                role: "developer"
            };
            const userAction = modifyPassword();
            try {
                const user = await userAction(userToModify, oldPassword, newPassword);
            }catch(err) {
                expect(err.message).toEqual("Password actual vacia o no definida");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si la nueva password esta vacia o no definida', async () => {
            expect.assertions(2);
            const oldPassword = "oldPassword";
            const oldHash = "oldHash";
            const newPassword = undefined;
            const userToModify = {
                _id: "userId",
                username: "username",
                email: "userToModify@aversium.com",
                password: oldHash,
                role: "developer"
            };
            const userAction = modifyPassword();
            try {
                const user = await userAction(userToModify, oldPassword, newPassword);
            }catch(err) {
                expect(err.message).toEqual("Password nueva vacia o no definida");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si la validación de la password actual sale false', async () => {
            expect.assertions(3);
            const oldPassword = "oldPassword";
            const oldHash = "oldHash";
            const newPassword = "newPassword";
            const newHash = "newHash";
            const userToModify = {
                _id: "userId",
                username: "username",
                email: "userToModify@aversium.com",
                password: oldHash,
                role: "developer"
            };
            const userRepository = mockUserRepositoryModifyPassword();
            const passwordComparer = mockPasswordComparerFalse();
            const userAction = modifyPassword(userRepository, passwordComparer);
            try {
                const user = await userAction(userToModify, oldPassword, newPassword);
            }catch(err) {
                expect(err.message).toEqual("Error al introducir la password actual");
                expect(passwordComparer).toBeCalledWith(oldPassword, oldHash);
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si da error la encriptación de la nueva password', async () => {
            expect.assertions(4);
            const oldPassword = "oldPassword";
            const oldHash = "oldHash";
            const newPassword = "newPassword";
            const newHash = "newHash";
            const userToModify = {
                _id: "userId",
                username: "username",
                email: "usertomodify@aversium.com",
                password: oldHash,
                role: "developer"
            };
            const userRepository = mockUserRepositoryModifyPassword();
            const passwordComparer = mockPasswordComparer();
            const encryptor = mockEncryptorError();
            const userAction = modifyPassword(userRepository, passwordComparer, encryptor);
            try {
                const user = await userAction(userToModify, oldPassword, newPassword);
            }catch(err) {
                expect(err.message).toEqual("Error al cifrar la nueva password");
                expect(passwordComparer).toBeCalledWith(oldPassword, oldHash);
                expect(encryptor).toBeCalledWith(newPassword);
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si da error al modificar la password', async () => {
            expect.assertions(5);
            const oldPassword = "oldPassword";
            const oldHash = "oldHash";
            const newPassword = "newPassword";
            const newHash = "newHash";
            const userToModify = {
                _id: "userId",
                username: "username",
                email: "usertomodify@aversium.com",
                password: oldHash,
                role: "scrumMaster"
            };
            const userRepository = mockUserRepositoryModifyPasswordError();
            const passwordComparer = mockPasswordComparer();
            const encryptor = mockEncryptor(newHash);
            const userAction = modifyPassword(userRepository, passwordComparer, encryptor);
            try {
                const user = await userAction(userToModify, oldPassword, newPassword);
            }catch(err) {
                expect(err.message).toEqual("Error al modificar la password");
                expect(passwordComparer).toBeCalledWith(oldPassword, oldHash);
                expect(encryptor).toBeCalledWith(newPassword);
                expect(userRepository.modifyPassword).toBeCalledWith(userToModify._id, newHash);
                expect(err instanceof Error).toBeTruthy();
            };
        });
    });
});