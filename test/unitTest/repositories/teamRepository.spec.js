'use strict';
const createTeamRepository = require('../../../repositories/teamRepository');

const mockTeamEntityGetAllSuccess = listTeams => ({
    find: jest.fn(() => new Promise((resolve) => resolve(listTeams)))
});

const mockTeamEntityGetAllFailure = listTeams => ({
    find: jest.fn(() => new Promise((resolve, reject) => reject(new Error("Lista de equipos no definida"))))
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
});