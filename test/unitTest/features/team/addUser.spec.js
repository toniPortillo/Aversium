'use strict';
const addUser = require('../../../../actions/team/addUser');

const mockUserRepository = user => ({
    findOneByEmail: jest.fn(() => new Promise(resolve => resolve(user)))
});

const mockCheckTeamService = user => jest.fn(() => new Promise(resolve => resolve(user)));

const mockTeamRepository = team => ({
    modifyUsers: jest.fn (() => new Promise(resolve => resolve(team)))
});

describe('Action team', () => {
    describe('Metodo: addUser', () => {
        it('Debe devolver el equipo modificado con el nuevo usuario, si no ocurre ningun problema', async () => {
            expect.assertions(2);
            const creator = [{
                _id: "creatorID",
                username: "creator",
                email: "creator@aversium.es",
                role: "productOwner"
            }];
            const user = [{
                _id: "user3",
                username: "user",
                email: "user@aversium.com",
                role: "developer",
            }];
            const users = [
                {
                    _id: "user1",
                    role: "scrumMaster",
                },
                {
                    _id: "user2",
                    role: "developer",
                },
                {
                    _id: "user4",
                    role: "developer",
                },
                {
                    _id: "creatorID",
                    username: "creator",
                    email: "creator@aversium.es",
                    role: "productOwner"
                }
            ];
            const team = [{
                id: "teamId",
                teamname: "teamname",
                creator: creator,
                maxmembers: 5,
                users: users
            }];
                
            try {

            }catch(err) {
                throw err;
            };
        });
    });
});