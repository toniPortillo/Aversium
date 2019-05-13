'use strict';
const showTeam = require('../../../../actions/team/showTeam');

const mockTeamRepositoryFindOneById = team => ({
    findOneById: jest.fn(() => new Promise(resolve => resolve(team)))
});

const mockTeamRepositoryFindOneByIdTeamUndefined = team => ({
    findOneById: jest.fn(() => new Promise(resolve => resolve(team = undefined)))
});

describe('Action team', () => {
    describe('Metodo showTeam', () => {
        it('Debe mostrar el equipo, si existe y el usuario pertenece a este', async () => {
            expect.assertions(2);
            const user = [{
                _id: "userID"
            }];
            const teamToShow = [{
                _id: "teamID",
                teamname: "teamname",
                creator: user,
                maxmembers: 5,
                users: user
            }];
            const teamRepository = mockTeamRepositoryFindOneById(teamToShow);
            const teamAction = showTeam(teamRepository);
            try {
                const team = await teamAction(teamToShow[0]._id, user[0]);
                expect(team).toEqual(teamToShow);
                expect(teamRepository.findOneById).toBeCalledWith(teamToShow[0]._id);
            }catch(err) {
                throw err;
            }
        });
        it('Debe devolver error, si el usuario no pertenece al equipo', async () => {
            expect.assertions(2);
            const user = [{
                _id: "userID"
            }];
            const teamToShow = [{
                _id: "teamID1",
                teamname: "teamname",
                creator: user,
                maxmembers: 5,
                users: user 
            }];
            const user2 = [{
               _id: "userID2",
            }];
            const teamRepository = mockTeamRepositoryFindOneById(teamToShow);
            const teamAction = showTeam(teamRepository);
            try {
                const team = await teamAction(teamToShow[0]._id, user2[0]);
            }catch(err) {
                expect(err.message).toEqual("El usuario no pertenece al equipo");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si el id del equipo no esta definido', async () => {
            expect.assertions(2);
            const teamToShow = [{
                _id: undefined
            }];

            const teamRepository = mockTeamRepositoryFindOneById(teamToShow);
            const teamAction = showTeam(teamRepository);
            try {
                const team = await teamAction(teamToShow[0]._id);
            }catch(err) {
                expect(err.message).toEqual("Id de equipo no definido");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el equipo o el usuario no esta definidos', async () => {
            expect.assertions(2);
            const teamToShow = [{
                _id: "teamID"
            }];
            const user = undefined;
            const teamRepository = mockTeamRepositoryFindOneByIdTeamUndefined(teamToShow);
            const teamAction = showTeam(teamRepository);
            try {
                const team = await teamAction(teamToShow[0]._id, user);
            }catch(err) {
                expect(err.message).toEqual("Equipo o usuario no definidos");
                expect(err instanceof Error).toBeTruthy();
            };
        });
    });
});