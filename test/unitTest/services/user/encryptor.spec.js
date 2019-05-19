'use strict';
const encryptor = require('../../../../services/user/encryptor');

const mockBcryptFunctions = (password, hash) => ({
    hash: jest.fn(() => new Promise(resolve => resolve(hash)))
});
describe('user service', () => {
    describe('Service: encryptor', () => {
        it('Debe devolver el hash de la password', async () => {
            expect.assertions(2);
            const password = "PASSWORD";
            const iterations = 12;
            const hash = "ASDKLQWLQKWEJLAKSM";

            const bcrypt = mockBcryptFunctions(password, hash);
            const createEncryptor =  encryptor(bcrypt);
            try {
                const encryptedPassword = await createEncryptor(password);
                expect(encryptedPassword).toEqual(hash);
                expect(bcrypt.hash).toBeCalledWith(password, iterations);
            }catch(err) {
                throw err;
            }
        });
    });
});