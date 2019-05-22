'use strict';
const showUser = require('../../../../actions/user/showUser');

const mockUserRepositorySuccess = userToShow => ({
    findOneById: jest.fn(() => new Promise(resolve => resolve(userToShow)))
});

const mockUserRepositoryFailure = userToShow => ({
    findOneById: jest.fn(() => new Promise((resolve, reject) => reject(new Error("Usuario no encontrado"))))
});

describe('Action user', () => {
    describe('Metodo: showUser', () => {
        it('Debe devolver el usuario para mostrarlo, si lo encuentra por el id', async () => {
            expect.assertions(2);
            const id = "userId";
            const userToShow = [{
                _id: "userId",
                username: "username",
                email: "email@aversium.com",
                password: "hash",
                role: "developer"
            }];
            const userRepository = mockUserRepositorySuccess(userToShow);
            const userAction = showUser(userRepository);
            try {
                const user = await userAction(id);
                expect(user).toEqual(userToShow);
                expect(userRepository.findOneById).toBeCalledWith(id);
            }catch(err) {
                throw err;
            }
        });
        it('Debe devolver un error, si el id esta vacio o no definido', async () => {
            expect.assertions(2);
            const id = undefined;
            const userAction = showUser();
            try {
                const user = await userAction();
            }catch(err) {
                expect(err.message).toEqual("Id vacio o no definido");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver un error, si no se encuentra el usuario', async () => {
            expect.assertions(2);
            const id = "userId";
            const userRepository = mockUserRepositoryFailure();
            const userAction = showUser(userRepository);
            try {
                const user = await userAction(id);
            }catch(err) {
                expect(err.message).toEqual("Usuario no encontrado");
                expect(err instanceof Error).toBeTruthy();
            };
        });
    });
});