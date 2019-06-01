'use strict';
const modifyMembersNumber = require('../../../../actions/team/modifyMembersNumber');

const mockTeamRepository = (teamToModify, modifiedTeam) => ({
    findOneById: jest.fn(() => new Promise(resolve => resolve(teamToModify))),
    modifyMembersNumber: jest.fn(() => new Promise(resolve => resolve(modifiedTeam)))
});

const mockTeamRepositoryFindOneByIdFailure = teamToModify => ({
    findOneById: jest.fn(() => new Promise((resolve, reject) => reject(new Error("Equipo no encontrado"))))
});

const mockTeamRepositoryModifyMembersNumberFailure = (teamToModify, modifiedTeam) => ({
    findOneById: jest.fn(() => new Promise(resolve => resolve(teamToModify))),
    modifyMembersNumber: jest.fn(() => new Promise((resolve, reject) => reject(new Error)))
});
describe('Action team', () => {
    describe('Metodo: modifyMembersNumber', () => {
        it('Debe devolver el equipo modificado, si este existe', async () => {
            expect.assertions(3);
            const creator = [{
                _id: "creatorId"
            }];
            const teamToModify = [{
                _id: "teamId",
                teamname: "teamToModify",
                creator: creator,
                maxmembers:3,
                users: creator
            }];

            const modifiedTeam = [{
                _id: "teamId",
                teamname: "teamToModify",
                creator: creator,
                maxmembers: 5,
                users: creator
            }];
            const resultingTeam = {
                team: modifiedTeam,
                message: "Numero máximo de miembros cambiado"
            };
            const teamRepository = mockTeamRepository(teamToModify, modifiedTeam);
            const teamAction = modifyMembersNumber(teamRepository);
            try {
                const team = await teamAction(teamToModify[0]._id, creator, modifiedTeam[0].maxmembers);
                expect(team).toEqual(resultingTeam);
                expect(teamRepository.findOneById).toBeCalledWith(teamToModify[0]._id);
                expect(teamRepository.modifyMembersNumber).toBeCalledWith(teamToModify[0]._id, modifiedTeam[0].maxmembers);
            }catch(err) {
                throw err;
            }
        });

        it('Debe devolver error, si el id de equipo no esta definido o esta vacia', async () => {
            expect.assertions(2);
            const teamToModify = [{
                _id: ""
            }];
            const teamAction = modifyMembersNumber();
            try {
                const team = await teamAction(teamToModify[0]._id);
            }catch(err) {
                expect(err.message).toEqual("Id de equipo vacia o no definida");
                expect(err instanceof Error).toBeTruthy();
            };
        });

        it('Debe devolver error, si no se encuentra el equipo', async () => {
            expect.assertions(3);
            const teamToModify = [{
                _id: "teamId"
            }];
            const teamRepository = mockTeamRepositoryFindOneByIdFailure(teamToModify);
            const teamAction = modifyMembersNumber(teamRepository);
            try {
                const team = await teamAction(teamToModify[0]._id);
            }catch(err) {
                expect(err.message).toEqual("Equipo no encontrado");
                expect(err instanceof Error).toBeTruthy();
                expect(teamRepository.findOneById).toBeCalledWith(teamToModify[0]._id);
            };
        });

        it('Debe devolver error, si el usuario que quiere modificar el equipo no es su creador', async () => {
            expect.assertions(3);
            const creator = [{
                _id: "creatorId"
            }];
            const user = [{
                _id: "userId"
            }];
            const teamToModify = [{
                _id: "teamToModifyId",
                teamname: "teamToModify",
                creator: user,
                maxmembers: 5,
                users: user
            }];

            const teamRepository = mockTeamRepository(teamToModify);
            const teamAction = modifyMembersNumber(teamRepository);
            try {
                const team = await teamAction(teamToModify[0]._id, creator);
            }catch(err) {
                expect(err.message).toEqual("No puede modificar el equipo, por no ser su responsable");
                expect(err instanceof Error).toBeTruthy();
                expect(teamRepository.findOneById).toBeCalledWith(teamToModify[0]._id);
            };
        });

        it('Debe devolver error, si existe ya un número mayor de miembros de los que quiere restringir', async () => {
            expect.assertions(3);
            const creator = [{
                _id: "creatorId"
            }];
            const users = [
                {
                    _id: "creatorId"
                },
                {
                    _id: "userId"
                },
                {
                    _id: "user2Id"
                },
                {
                    _id: "user3Id"
                }
            ];
            const teamToModify = [{
                _id: "teamId",
                teamname: "teamToModify",
                creator: creator,
                maxmembers:5,
                users: users
            }];
            const maxMembers = 3;
            const teamRepository = mockTeamRepository(teamToModify);
            const teamAction = modifyMembersNumber(teamRepository);
            try {
                const team = await teamAction(teamToModify[0]._id, creator, maxMembers);
            }catch(err) {
                expect(err.message).toEqual("Existe ya un número mayor de miembros, de los que quiere restringir");
                expect(err instanceof Error).toBeTruthy();
                expect(teamRepository.findOneById).toBeCalledWith(teamToModify[0]._id);
            };
        });

        it('Debe devolver error, si el id usuario que quiere modificar el equipo no esta definido o esta vacio', async () => {
            expect.assertions(3);
            const creator = undefined;
            const user = [{
                _id: "userId"
            }];
            const teamToModify = [{
                _id: "teamToModifyId",
                teamname: "teamToModify",
                creator: user,
                maxmembers: 5,
                users: user
            }];

            const teamRepository = mockTeamRepository(teamToModify);
            const teamAction = modifyMembersNumber(teamRepository);
            try {
                const team = await teamAction(teamToModify[0]._id, creator);
            }catch(err) {
                expect(err.message).toEqual("Creador no definido");
                expect(err instanceof Error).toBeTruthy();
                expect(teamRepository.findOneById).toBeCalledWith(teamToModify[0]._id);
            };
        });

        it('Debe devolver error, si existe el mismo número de miembros de los que quiere restringir', async () => {
            expect.assertions(3);
            const creator = [{
                _id: "creatorId"
            }];
            const users = [
                {
                    _id: "creatorId"
                },
                {
                    _id: "userId"
                },
                {
                    _id: "user2Id"
                },
                {
                    _id: "user3Id"
                }
            ];
            const teamToModify = [{
                _id: "teamId",
                teamname: "teamToModify",
                creator: creator,
                maxmembers:5,
                users: users
            }];
            const maxMembers = 4;
            const teamRepository = mockTeamRepository(teamToModify);
            const teamAction = modifyMembersNumber(teamRepository);
            try {
                const team = await teamAction(teamToModify[0]._id, creator, maxMembers);
            }catch(err) {
                expect(err.message).toEqual("El número de miembros es igual, a los que quiere restringir");
                expect(err instanceof Error).toBeTruthy();
                expect(teamRepository.findOneById).toBeCalledWith(teamToModify[0]._id);
            };
        });
        
        it('Debe devolver error, si ocurrió un error en la función modifyMembersNumber del teamRepository', async () => {
            expect.assertions(3);
            const creator = [{
                _id: "creatorId"
            }];
            const users = [
                {
                    _id: "creatorId"
                },
                {
                    _id: "userId"
                },
                {
                    _id: "user2Id"
                },
                {
                    _id: "user3Id"
                }
            ];
            const teamToModify = [{
                _id: "teamId",
                teamname: "teamToModify",
                creator: creator,
                maxmembers:4,
                users: users
            }];
            const maxMembers = 5;
            const teamRepository = mockTeamRepositoryModifyMembersNumberFailure(teamToModify)
            const teamAction = modifyMembersNumber(teamRepository);
            try {
                const team = await teamAction(teamToModify[0]._id, creator, maxMembers);
            }catch(err) {
                expect(err instanceof Error).toBeTruthy();
                expect(teamRepository.findOneById).toBeCalledWith(teamToModify[0]._id);
                expect(teamRepository.modifyMembersNumber).toBeCalledWith(teamToModify[0]._id, maxMembers);
            };
        });
    });
});