'use strict';
const createTeamRepository = require('../../../repositories/teamRepository');

const mockTeamEntityGetAllSuccess = listTeams => ({
    find: jest.fn(() => new Promise((resolve) => resolve(listTeams)))
});

const mockTeamEntityGetAllFailure = listTeams => ({
    find: jest.fn(() => new Promise((resolve, reject) => reject(new Error("Lista de equipos no definida"))))
});

const mockTeamEntityCreateSuccess = teamCreated => ({
    find: jest.fn(() => new Promise(resolve => resolve([]))),
    save: jest.fn(() => new Promise(resolve => resolve(teamCreated)))
});

const mockTeamEntityCreateFailure = teamCreated => ({
    find: jest.fn(() => new Promise(resolve => resolve([teamCreated])))
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
        it('Debe devolver el equipo, si lo encuentra por el nombre', async () => {
            expect.assertions();
        });
    });
});