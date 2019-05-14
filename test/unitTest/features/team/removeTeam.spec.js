'use strict';
const removeTeam = require('../../../../actions/team/removeTeam');

const mockTeamRepositoryRemoveByIdSuccess = teamRemoved => ({
    removeById: jest.fn(() => new Promise(resolve => resolve(teamRemoved)))
});

describe('Action team', () => {
    describe('Metodo removeTeam', () => {
        it('Debe devolver el equipo borrado, si este existe', async () => {
            expect.assertions(2);
            const user = [{
                _id: "userID"
            }];
            const teamToDelete = [{
                _id: "teamID",
                teamname: "TEAMNAME",
                creator: user,
                maxmembers: 5,
                users: user
            }];
            const teamRemoved = {
                team: teamToDelete,
                message: "Equipo eliminado exitosamente"
            };
            const teamRepository = mockTeamRepositoryRemoveByIdSuccess(teamToDelete);
            const teamAction = removeTeam(teamRepository);
            try {
                const team = await teamAction(teamToDelete, user);
                expect(team).toEqual(teamRemoved);
                expect(teamRepository.removeById).toBeCalledWith(teamToDelete[0]._id);
            }catch(err) {
                throw err;
            };
        });
        
        it('Debe devolver error, si el creador no esta definido', async () => {
            expect.assertions(2);
            const user = undefined;
            const teamToDelete = [{
                _id: "teamID",
                teamname: "TEAMNAME",
                creator: user,
                maxmembers: 5,
                users: user
            }];
            const teamAction = removeTeam();
            try {
                const team = await teamAction(teamToDelete, user);
            }catch(err) {
                expect(err.message).toEqual("Creador no definido");
                expect(err instanceof Error).toBeTruthy();
            };
        });

        it('Debe devolver error, si el equipo no esta definido', async () => {
            expect.assertions(2);
            const teamToDelete = undefined;
            const teamAction = removeTeam();
            try {
                const team = await teamAction(teamToDelete);
            }catch(err){
                expect(err.message).toEqual("Equipo no definido");
                expect(err instanceof Error).toBeTruthy();
            };
        });

        it('Debe devolver error, si el usuario intentar eliminar el equipo sin ser su creador', async () => {
            expect.assertions(2);
            const user = [{
                _id: "userID"
            }];
            const user1 = [{
                _id: "userID1"
            }];
            const teamToDelete = [{
                _id: "teamID",
                teamname: "TEAMNAME",
                creator: user1,
                maxmembers: 5,
                users: user1
            }];
            const teamAction = removeTeam();
            try {
                const team = await teamAction(teamToDelete, user);
            }catch(err) {
                expect(err.message).toEqual("No puede eliminar el equipo, por no ser su responsable");
                expect(err instanceof Error).toBeTruthy();
            };
        });
    });
});