'use strict';
const modifyRole = require('../../../../actions/user/modifyRole');

const mockUserRepository = modifiedUser => ({
    modifyRole: jest.fn(() => new Promise(resolve => resolve(modifiedUser)))
});

describe('Action user', () => {
    describe('Metodo: modifyRole', () => {
        it('Debe modificar el rol del usuario, si todo esta correcto', async () => {
            expect.assertions(2);
            const userToModify = {
                _id: "userId",
                username: "usernmame",
                email: "email@aversium.com",
                password: "hash",
                role: "scrumMaster"
            };
            const role = "productOwner";
            const modifiedUser = {
                _id: "userId",
                username: "username",
                email: "email@aversium.com",
                password: "hash",
                role: "productOwner"
            };
            const userRepository = mockUserRepository(modifiedUser);
            const userAction = modifyRole(userRepository);
            try {
                const user = await userAction(userToModify, role);
                expect(user).toEqual(modifiedUser);
                expect(userRepository.modifyRole).toBeCalledWith(userToModify._id, role);
            }catch(err) {
                throw err;
            }
        });
        it('Debe devolver error, si el usuario esta vacio o no definido', async () => {
            expect.assertions(2);
            const userToModify = undefined;
            const role = "developer";
            const userAction = modifyRole();
            try {
                const user = await userAction(userToModify, role);
            }catch(err) {
                expect(err.message).toEqual("Usuario vacio o no definido");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el role esta vacio o no definido', async () => {
            expect.assertions(2);
            const userToModify = {
                _id: "userId",
                username: "usernmame",
                email: "email@aversium.com",
                password: "hash",
                role: "scrumMaster"
            };
            const role = "";
            const userAction = modifyRole();
            try {
                const user = await userAction(userToModify, role);
            }catch(err) {
                expect(err.message).toEqual("Rol vacio o no definido");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el role no esta entre los definidos', async () => {
            expect.assertions(2);
            const userToModify = {
                _id: "userId",
                username: "username",
                email: "email@aversium.com",
                password: "hash",
                role: "developer"
            };
            const role = "mistake";
            const userAction = modifyRole();
            try {
                user = await userAction(userToModify, role);
            }catch(err) {
                expect(err.message).toEqual("Error: este rol no esta contemplado");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si el rol a cambiar es igual al nuevo introducido', async () => {
            expect.assertions(2);
            const userToModify = {
                _id: "userId",
                username: "username",
                email: "email@aversium.com",
                password: "hash",
                role: "developer"
            };
            const role = "developer";
            const userAction = modifyRole();
            try {
                const user = await userAction(userToModify, role)
            }catch(err) {
                expect(err.message).toEqual("Es el mismo rol que ya tiene");
                expect(err instanceof Error).toBeTruthy();
            }
        });
    });
});