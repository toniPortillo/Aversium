'use strict';
const showTeams = require('../../../../actions/team/showTeams');

const mockTeamRepositoryGetAllSuccess = listTeams => ({
    getAll: jest.fn(() => new Promise(resolve => resolve(listTeams)))
});

const mockTeamRepositoryGetAllListNotDefined = listTeams => ({
    getAll: jest.fn().mockReturnValue(new Error("Lista de equipos no definida"))
});

describe('Action Team', () => {
    describe('Metodo showTeams', () => {
        it('Debe obtener la lista de equipos, si no esta vacia', async () => {
            expect.assertions(2);
            const user1 = {
                _id: "user1ID"
            };
            const user2 = {
                _id: "user2ID"
            };
            const team1 = {
                teamname: "TEAMNAME1",
                creator: user1,
                maxmembers: 5,
                users: user1
            };
            const team2 = {
                teamname: "TEAMNAME2",
                creator: user2,
                maxmembers: 5,
                users: user2
            };
            const teamlist = [
                team1,
                team2
            ];
            const teamRepository = mockTeamRepositoryGetAllSuccess(teamlist);
            const teamAction = showTeams(teamRepository);
            try {
                const teamList = teamAction();
                expect(teamList).toEqual(teamList);
                expect(teamRepository.getAll).toBeCalledWith();
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver un error, si la lista de equipos no esta definida', async () => {
            expect.assertions(2);
            const teamList = undefined;
            const teamRepository = mockTeamRepositoryGetAllListNotDefined(teamList);
            const teamAction = showTeams(teamRepository);
            try{
                const teamList = await teamAction();
            }catch(err) {
                expect(err.message).toEqual("Lista de equipos no definida");
                expect(err instanceof Error).toBeTruthy();
            };
        });
    });
});