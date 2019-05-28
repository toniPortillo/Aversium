'use strict';
const createTeam = require('../../../../actions/team/createTeam');

const mockTeamRepositoryCreateSuccess = teamCreated => ({
    create: jest.fn(() => new Promise(resolve => resolve(teamCreated)))
});

const mockTeamRepositoryCreateTeamExist = teamCreated => ({
    create: jest.fn(() => new Promise(resolve => resolve(new Error("Equipo ya existente"))))
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
        it('Debe crear un equipo con maxmembers igual a 1, si es menor que 1', async () => {
            expect.assertions(2);
            const user = [{_id: "userID"}];
            const teamToCreate = {
                _id: "teamId",
                teamname: "TEAMNAME",
                creator: user,
                maxmembers: 0,
                users: user
            };
            const teamGreatherThanZero = {
                _id: "teamId",
                teamname: "TEAMNAME",
                creator: user,
                maxmembers: 1,
                users: user
            };
            const teamCreated = {
                team: teamGreatherThanZero,
                message:"Equipo creado exitosamente"
            };
            
            const teamRepository = mockTeamRepositoryCreateSuccess(teamGreatherThanZero);
            const teamAction = createTeam(teamRepository);
            try {
                const team = await teamAction(teamToCreate, user);
                expect(team).toEqual(teamCreated);
                expect(teamRepository.create).toBeCalledWith(teamToCreate.teamname, user, teamGreatherThanZero.maxmembers);
            }catch(err) {
                throw err;
            }
        });
        it('Debe devolver errores de validación, si el parametro creator es incorrecto', async () => {
            expect.assertions(2);
            const creator = [{_id: "userID"}];
            const teamToCreate = {
                _id: "userId",
                teamname: "TEAMNAME",
                creator: 5,
                maxmembers: 5,
                users: creator
            };
            const teamAction = createTeam();
            try {
                const user = await teamAction(teamToCreate, creator); 
            }catch(err) {
                expect(err.message).toEqual("Error: en el creador del equipo");
                expect(err instanceof Error).toBeTruthy();
            }  
        });
        it('Debe devolver errores de validación, si el parametro teamname es incorrecto', async () => {
            expect.assertions(2);
            const creator = [{_id: "userID"}];
            const teamToCreate = {
                _id: "userId",
                teamname: "",
                creator: creator,
                maxmembers: 5,
                users: creator
            };
            const teamAction = createTeam();
            try {
                const user = await teamAction(teamToCreate, creator); 
            }catch(err) {
                expect(err.message).toEqual("Error: en el nombre del equipo");
                expect(err instanceof Error).toBeTruthy();
            }  
        });
        it('Debe devolver errores de validación, si el parametro maxmembers es incorrecto', async () => {
            expect.assertions(2);
            const creator = [{_id: "userID"}];
            const teamToCreate = {
                _id: "userId",
                teamname: "teamname",
                creator: creator,
                maxmembers: undefined,
                users: creator
            };
            const teamAction = createTeam();
            try {
                const user = await teamAction(teamToCreate, creator); 
            }catch(err) {
                expect(err.message).toEqual("Error: en el número máximo de miembros del equipo");
                expect(err instanceof Error).toBeTruthy();
            }  
        });
        it('Debe devolver error, si se pasa un equipo vacio o no definido', async () => {
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
        it('Debe devolver error, si se pasa el user vacio o no definido', async () => {
            expect.assertions(2);
            const user = [];
            const greatherThanZero = 5;
            const teamToCreate = {
                teamname: "TEAMNAME",
                creator: user,
                maxmembers: greatherThanZero,
                users: user
            };
            const teamAction = createTeam();
            try {
                const team = await teamAction(teamToCreate);
            }catch(err) {
                expect(err.message).toEqual("Creador vacio");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si el equipo ya existe', async () => {
            expect.assertions(3);
            const user = [{
                _id: "userID"
            }];
            const greatherThanZero = 5;
            const teamToCreate = {
                teamname: "TEAMNAME",
                creator: user,
                maxmembers: greatherThanZero,
                users: user
            };
            const teamRepository = mockTeamRepositoryCreateTeamExist(teamToCreate);
            const teamAction = createTeam(teamRepository);
            try {
                const team = await teamAction(teamToCreate, user);
            }catch(err) {
                expect(err.message).toEqual("Equipo ya existente");
                expect(err instanceof Error).toBeTruthy();
                expect(teamRepository.create).toBeCalledWith(teamToCreate.teamname, user, greatherThanZero);
            };
        });
    });
})