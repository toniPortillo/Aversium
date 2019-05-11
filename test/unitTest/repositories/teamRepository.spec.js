'use strict';
const createTeamRepository = require('../../../repositories/teamRepository');

const mockTeamEntityGetAllSuccess = listTeams => ({
    find: jest.fn(() => new Promise((resolve) => resolve(listTeams)))
});

const mockTeamEntityGetAllFailure = listTeams => ({
    find: jest.fn(() => new Promise(resolve => resolve(listTeams)))
});

const mockTeamEntityCreateSuccess = teamCreated => ({
    find: jest.fn(() => new Promise(resolve => resolve([]))),
    save: jest.fn(() => new Promise(resolve => resolve(teamCreated)))
});

const mockTeamEntityCreateFailure = teamCreated => ({
    find: jest.fn(() => new Promise(resolve => resolve([teamCreated])))
});

const mockTeamEntityFindByNameSuccess = teamFound => ({
    find: jest.fn(() => new Promise(resolve => resolve(teamFound)))
});

const mockTeamEntityFindByNameFailure = teamFound => ({
    find: jest.fn(() => new Promise(resolve => resolve(teamFound)))
});

const mockTeamEntityFindByIdSuccess = teamFound => ({
    find: jest.fn(() => new Promise(resolve => resolve(teamFound)))
});

const mockTeamEntityFindByIdFailure = teamFound => ({
    find: jest.fn(() => new Promise(resolve => resolve(teamFound)))
});

const mockTeamEntityRemoveByIdSuccess = teamToRemove => ({
    find: jest.fn(() => new Promise(resolve => resolve(teamToRemove))),
    remove: jest.fn(() => new Promise(resolve => resolve(teamToRemove[0])))
});

const mockTeamEntityRemoveByIdFailure = teamToRemove => ({
    find: jest.fn(() => new Promise(resolve => resolve([])))
});

const mockTeamEntityModifyUsersSuccess = (teamToModify, teamModify) => ({
    find: jest.fn(() => new Promise(resolve => resolve(teamToModify))),
    findOneAndUpdate: jest.fn(() => new Promise(resolve => resolve(teamModify)))
});

const mockTeamEntityModifyUsersFailure = teamToModify => ({
    find: jest.fn(() => new Promise(resolve => resolve(teamToModify)))
});

describe('Repositorio: Team', () => {
    describe('Metodo getAll', () => {
        it('Debe rellenar un array con los equipos', async () => {
            expect.assertions(2);
            const team1 = {};
            const team2 = {};
            const teamListToCreate = [
                team1,
                team2
            ];
            const teamEntity =  mockTeamEntityGetAllSuccess(teamListToCreate);
            const teamRepository = createTeamRepository(teamEntity);
            try {
                const teamList = await teamRepository.getAll();
                expect(teamList).toEqual(teamListToCreate);
                expect(teamEntity.find).toBeCalledWith({});
            }catch(err) {
                throw err;
            }
        });
        it('Debe devolver error, si la lista de equipos no esta definida', async () => {
            expect.assertions(2);
            const teamListToCreate = undefined;
            const teamEntity = mockTeamEntityGetAllFailure(teamListToCreate);
            const teamRepository = createTeamRepository(teamEntity);
            try {
                const teamList = await teamRepository.getAll();
            }catch(err) {
                expect(err.message).toEqual("Lista de equipos no definida");
                expect(err instanceof Error).toBeTruthy();
            }
        });
    });
    describe('Metodo create', () => {
        it('Debe guardar un proyecto en la bd, si este no existe', async () => {
            expect.assertions(2);
            const creator = [{
                _id: "USERID"
            }];
            const teamToCreate = {
                teamname: "TEAMNAME",
                creator: creator,
                maxmembers: 5,
                users: [creator]
            };

            const teamEntity = mockTeamEntityCreateSuccess(teamToCreate);
            const teamRepository = createTeamRepository(teamEntity);
            try {
                const team = await teamRepository.create(teamToCreate.teamname, creator, teamToCreate.maxmembers);
                expect(team).toEqual(teamToCreate);
                expect(teamEntity.find).toBeCalledWith({teamname: teamToCreate.teamname});
            }catch(err) {
                throw err;
            }
        });
        it('Debe devolver error, si el equipo ya existe en la bd', async () => {
            expect.assertions(2);
            const creator = [{
                _id: "USERID"
            }];
            const teamToCreate = {
                teamname: "TEAMNAME",
                creator: creator,
                maxmembers: 5,
                users: [creator]
            };
            const teamEntity = mockTeamEntityCreateFailure(teamToCreate);
            const teamRepository = createTeamRepository(teamEntity);
            try {
                const team = await teamRepository.create(teamToCreate.teamname, creator, teamToCreate.maxmembers);
            }catch(err) {
                expect(err.message).toEqual("Equipo ya existente");
                expect(err instanceof Error).toBeTruthy();
            }
        });
    });
    describe('Metodo findOneByName', () => {
        it('Debe devolver el equipo, si lo encuentra por el nombre', async () => {
            expect.assertions(2);
            const teamFound = [{
                teamname: "TEAMNAME"
            }];
            const teamEntity = mockTeamEntityFindByNameSuccess(teamFound);
            const teamRepository = createTeamRepository(teamEntity);
            try {
                const team = await teamRepository.findOneByName(teamFound[0].teamname);
                expect(team).toEqual(teamFound);
                expect(teamEntity.find).toBeCalledWith({teamname: teamFound[0].teamname});
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver un error, si no encuentra el equipo por el nombre', async () => {
            expect.assertions(2);
            const teamFound = [];
            const teamEntity = mockTeamEntityFindByNameFailure(teamFound);
            const teamRepository = createTeamRepository(teamEntity);
            try {
                const team = await teamRepository.findOneByName();
            }catch(err) {
                expect(err.message).toEqual("Equipo no encontrado");
                expect(err instanceof Error).toBeTruthy();
            };
        })
    });
    describe('Metodo findOneById', () => {
        it('Debe devolver el equipo, si lo encuentra por el id', async () => {
            expect.assertions(2);
            const teamFound = [{
                _id: "teamID"
            }];
            const teamEntity = mockTeamEntityFindByIdSuccess(teamFound);
            const teamRepository = createTeamRepository(teamEntity);
            try {
                const team = await teamRepository.findOneById(teamFound[0]._id);
                expect(team).toEqual(teamFound);
                expect(teamEntity.find).toBeCalledWith({_id: teamFound[0]._id});
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver un error, si no encuentra el equipo por el id', async () => {
            expect.assertions(2);
            const teamFound = [];
            const teamEntity = mockTeamEntityFindByIdFailure(teamFound);
            const teamRepository = createTeamRepository(teamEntity);
            try{
                const team = await teamRepository.findOneById();
            }catch(err) {
                expect(err.message).toEqual("Equipo no encontrado");
                expect(err instanceof Error).toBeTruthy();
            }
        });
    });
    describe('Metodo removeById', () => {
        it('Debe eliminar el equipo, si lo encuentra por el id', async () => {
            expect.assertions(3);
            const teamToRemove = [{
                _id: "teamID"
            }];
            const teamEntity = mockTeamEntityRemoveByIdSuccess(teamToRemove);
            const teamRepository = createTeamRepository(teamEntity);
            try {
                const teamRemove = await teamRepository.removeById(teamToRemove[0]._id);
                expect(teamRemove).toEqual(teamToRemove[0]);
                expect(teamEntity.find).toBeCalledWith({_id: teamToRemove[0]._id});
                expect(teamEntity.remove).toBeCalledWith({_id: teamToRemove[0]._id});
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver un error, si no encuentra el proyecto para ser borrado', async () => {
            expect.assertions(2);
            const teamToRemove = [];
            const teamEntity = mockTeamEntityRemoveByIdFailure(teamToRemove);
            const teamRepository = createTeamRepository(teamEntity);
            try {
                const teamRemove = await teamRepository.removeById();
            }catch(err) {
                expect(err.message).toEqual("Equipo no encontrado. No, se realizó el borrado del equipo");
                expect(err instanceof Error).toBeTruthy();
            }
        });
    });
    describe('Metodo modifyUsers', () => {
        it('Debe modificar los usuarios del equipo, si este existe', async () => {
            expect.assertions(3);
            const teamToModify = [{
                _id: "teamID",
                users: []
            }];
            const user1 = {
                _id: "user1ID"
            };
            const user2 = {
                _id: "user2ID"
            };
            const users = [
                user1,
                user2
            ];
            const teamModify = {
                _id: "teamID",
                users: users
            }
            const teamEntity = mockTeamEntityModifyUsersSuccess(teamToModify, teamModify);
            const teamRepository = createTeamRepository(teamEntity);
            try {
                const teamModified = await teamRepository.modifyUsers(teamToModify[0]._id, users);
                expect(teamModified).toEqual(teamModify);
                expect(teamEntity.find).toBeCalledWith({_id: teamToModify[0]._id});
                expect(teamEntity.findOneAndUpdate).toBeCalledWith({_id: teamToModify[0]._id}, {users: users})
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver un error, si el equipo no es encontradado para realizar la modificacion', async () => {
            expect.assertions(2);
            const teamToModify = [];
            const teamEntity = mockTeamEntityModifyUsersFailure(teamToModify);
            const teamRepository = createTeamRepository(teamEntity);
            try {
                const teamModified = await teamRepository.modifyUsers();
            }catch(err) {
                expect(err.message).toEqual("Equipo no encontrado. No, se realizó cambio en los usuarios del equipo");
                expect(err instanceof Error).toBeTruthy();
            };
        });
    });
});