'use strict';
const userLogin = require('../../../../actions/user/userLogin');

const mockUserRepositoryFindOneByEmailSuccess = user => ({
    findOneByEmail: jest.fn(() => new Promise(resolve => resolve(user)))
});

const mockUserRepositoryFindOneByEmailFailure = user => ({
    findOneByEmail: jest.fn(() => new Promise((resolve, reject) => reject(new Error("Usuario no encontrado"))))
});

const mockPasswordComparerFunctionTrue = jest.fn().mockImplementation(() => () => new Promise(resolve => resolve(true)));
const mockPasswordComparerFunctionFalse = jest.fn().mockImplementation(() => () => new Promise(resolve => resolve(false)));
describe('Action user', () => {
    describe('Metodo: userLogin', () => {
        it('Debe devolver el usuario, si existe y la contraseña es correcta', async () => {
            expect.assertions(3);
            const email = "email@aversium.com";
            const password = "hash";
            const userToLogin = [{
                _id: "userId",
                username: "username",
                email: "email@aversium.com",
                password: "hash",
                role: "productOwner"
            }];
            const userRepository = mockUserRepositoryFindOneByEmailSuccess(userToLogin);
            const userAction = userLogin(userRepository, mockPasswordComparerFunctionTrue(password, userToLogin.password));
            try {
                const user = await userAction(email, password);
                expect(user).toEqual(userToLogin);
                expect(userRepository.findOneByEmail).toBeCalledWith(email);
                expect(mockPasswordComparerFunctionTrue).toBeCalledWith(password, userToLogin.password);
            }catch(err) {
                throw err;
            }
        });
        it('Debe devolver un error, si el email esta vacio o no definido', async () => {
            expect.assertions(2);
            const email = undefined;
            const password = "hash";
            const userToLogin = [{
                _id: "userId",
                username: "username",
                email: "email@aversium.com",
                password: "hash",
                role: "productOwner"
            }];
            const userRepository = mockUserRepositoryFindOneByEmailSuccess(userToLogin);
            const userAction = userLogin(userRepository, mockPasswordComparerFunctionTrue(password, userToLogin.password));
            try {
                const user = await userAction(email, password);
            }catch(err) {
                expect(err.message).toEqual("Email vacio o no definido");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver un error, si la password esta vacia o no definido', async () => {
            expect.assertions(2);
            const email = "email@aversium.com";
            const password = "";
            const userToLogin = [{
                _id: "userId",
                username: "username",
                email: "email@aversium.com",
                password: "hash",
                role: "productOwner"
            }];
            const userRepository = mockUserRepositoryFindOneByEmailSuccess(userToLogin);
            const userAction = userLogin(userRepository, mockPasswordComparerFunctionTrue(password, userToLogin.password));
            try {
                const user = await userAction(email, password);
            }catch(err) {
                expect(err.message).toEqual("Password vacia o no definida");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver un error, si el usuario no existe', async () => {
            expect.assertions(2);
            const email = "email@aversium.com";
            const password = "hash";
            const userRepository = mockUserRepositoryFindOneByEmailFailure();
            const userAction = userLogin(userRepository);
            try {
                const user = await userAction(email, password);
            }catch(err) {
                expect(err.message).toEqual("Usuario no encontrado");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver un error, si la password no es correcta', async () => {
            expect.assertions(2);
            const email = "email@aversium.com";
            const password = "hash";
            const userToLogin = [{
                _id: "userId",
                username: "username",
                email: "email@aversium.com",
                password: "hash",
                role: "productOwner"
            }];
            const userRepository = mockUserRepositoryFindOneByEmailSuccess(userToLogin);
            const userAction = userLogin(userRepository, mockPasswordComparerFunctionFalse(password, userToLogin.password));
            try {
                const user = await userAction(email, password);
            }catch(err) {
                expect(err.message).toEqual("Password incorrecta");
                expect(err instanceof Error).toBeTruthy();
            }
        });
    });
});