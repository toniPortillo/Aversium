'use strict';
const createTeam = require('../../../../actions/team/createTeam');

const mockTeamRepositoryCreateSuccess = teamCreated => ({
    create: jest.fn(() => new Promise(resolve => resolve(teamCreated)))
});

const mockTeamRepositoryCreateTeamExist = teamCreated => ({
    create: jest.fn().mockReturnValue(new Error("Equipo ya existente"))
});

describe('Action Team', () => {
    describe('Metodo createTeam', () => {
        it('Debe crear un equipo, si todo esta correcto', async () => {
            expect.assertions(2);
            const user = [{_id: "userID"}];
            const teamToCreate = {
                teamname: "TEAMNAME",
                creator: user,
                maxmembers: 5,
                users: user
            };
            const teamCreated = {
                team: teamToCreate,
                message:"Equipo creado exitosamente"
            };
            
            const teamRepository = mockTeamRepositoryCreateSuccess(teamToCreate);
            const teamAction = createTeam(teamRepository);
            try {
                const team = await teamAction(teamToCreate, user);
                expect(team).toEqual(teamCreated);
                expect(teamRepository.create).toBeCalledWith(teamToCreate.teamname, user, teamToCreate.maxmembers);
            }catch(err) {
                throw err;
            }
        });
        it('Debe devolver errores de validacion, si algun parametro es incorrecto', async () => {
            expect.assertions(2);
            const user = undefined;
            const teamToCreate = {
                teamname: undefined,
                creator: user,
                maxmembers: 'cinco',
                users: user
            };
            
            const teamAction = createTeam();
            try {
                const team = await teamAction(teamToCreate, user);
            }catch(err) {
                expect(err.message).toEqual("Error: en el nombre del equipo");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si se pasa un equipo vacio', async () => {
            expect.assertions(2);
            const user = {
                _id: "userID"
            }
            const teamToCreate = undefined;
            const teamAction = createTeam();
            try {
                const team = await teamAction(teamToCreate);
            }catch(err) {
                expect(err.message).toEqual("Equipo vacio");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si el equipo ya existe', async () => {
            expect.assertions(2);
            const user = [{
                _id: "userID"
            }];
            const teamToCreate = {
                teamname: "TEAMNAME",
                creator: user,
                maxmembers: 5,
                users: user
            };
            const teamRepository = mockTeamRepositoryCreateTeamExist(teamToCreate);
            const teamAction = createTeam(teamRepository);
            try {
                const team = await teamAction(teamToCreate, user);
            }catch(err) {
                expect(err.message).toEqual("Equipo ya existente");
                expect(err instanceof Error).toBeTruthy();
            };
        });
    });
})