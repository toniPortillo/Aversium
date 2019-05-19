'use strict';
const passwordComparer = require('../../../../services/user/passwordComparer');

const mockBcryptFunctions = (password, hash) => ({
    compare: jest.fn(() => new Promise(resolve => resolve(true)))
});
describe('user service', () => {
    describe('Service: passwordComparer', () => {
        it('Debe devolver el match a true, si la comparacion hash, password es correcta', async () => {
            expect.assertions(2);
            const password = "PASSWORD";
            const hash = "ASDASDJLQWJODQJWOIDJ";

            const bcrypt = mockBcryptFunctions(password, hash);
            const createPasswordComparer = passwordComparer(bcrypt);
            try {
                const match = await createPasswordComparer(password, hash);
                expect(match).toBeTruthy();
                expect(bcrypt.compare).toBeCalledWith(password, hash);
            }catch(err) {
                throw err;
            };
        });
    });
});