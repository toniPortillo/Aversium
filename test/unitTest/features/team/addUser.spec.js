'use strict';
const addUser = require('../../../../actions/team/addUser');

const mockUserRepository = user => ({
    findOneByEmail: jest.fn(() => new Promise(resolve => resolve(user)))
});

const mockCheckTeamService = jest.fn(user => () => new Promise(resolve => resolve(user)));

const mockTeamRepository = team => ({
    modifyUsers: jest.fn (() => new Promise(resolve => resolve(team)))
});

describe('Action team', () => {
    describe('Metodo: addUser', () => {
        it('Debe devolver el equipo modificado con el nuevo usuario, si no ocurre ningun problema', async () => {
            expect.assertions(1);
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
            const teamToModify = [{
                id: "teamId",
                teamname: "teamname",
                creator: creator,
                maxmembers: 5,
                users: users
            }];
            const modifiedUsers = [
                {
                    _id: "user1",
                    role: "scrumMaster",
                },
                {
                    _id: "user2",
                    role: "developer",
                },
                {
                    _id: "user3",
                    username: "user",
                    email: "user@aversium.com",
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
            const modifiedTeam = [{
                id: "teamId",
                teamname: "teamname",
                creator: creator,
                maxmembers: 5,
                users: modifiedUsers
            }];
            const resultingTeam = {
                team: modifiedTeam,
                message: "Usuario añadido con exito"
            };
            const userRepository = mockUserRepository(user);
            const teamRepository = mockTeamRepository(teamToModify);
            const checkTeamService = mockCheckTeamService(user);
            const teamAction = addUser(teamRepository, userRepository, checkTeamService);
            try {
                const team = await teamAction(teamToModify, creator, user.email);
                expect(team).toEqual(resultingTeam);
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver error, si ocurre algún problema en la validación', async () => {
            expect.assertions(2);
        });
    });
});