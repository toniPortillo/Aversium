'use strict';
const createCheckTeam = require('../../../../services/team/checkTeam');

describe('Services team', () => {
    describe('Service checkTeam', () => {
        it('Debe devolver el productOwner, si puede estar en el equipo', async () => {
            expect.assertions(1);
            const productOwner = [{
                _id: "productOwnerID",
                email: "productowner@aversium.com",
                role: "productOwner"
            }];
            const team = [{
                _id: "teamID",
                maxmembers: 5,
                users: [
                    {
                        _id: "scrumMasterID",
                        email: "scrummaster@aversium.com",
                        role: "scrumMaster"
                    }
                ]
            }];
            const checkTeam = createCheckTeam(team[0], productOwner[0]);
            try{
                const memberValidated = await checkTeam();
                expect(memberValidated).toEqual(productOwner[0]);
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver el scrumMaster, si puede estar en el equipo', async () => {
            expect.assertions(1);
            const scrumMaster = [{
                _id: "scrumMasterID",
                email: "scrumMaster@aversium.com",
                role: "scrumMaster"
            }];
            const team =[{
                _id: "teamID",
                maxmembers: 5,
                users: [
                    {
                        _id: "productOwnerID",
                        email: "productOwner@aversium.com",
                        role: "productOwner"
                    }
                ]
            }];
            const checkTeam = createCheckTeam(team[0], scrumMaster[0]);
            try {
                const memberValidated = await checkTeam();
                expect(memberValidated).toEqual(scrumMaster[0]);     
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver error, si el productOwner no puede estar en el equipo', async () => {
            expect.assertions(2);
            const productOwner = [{
                _id: "productOwnerID",
                email: "productowner@aversium.com",
                role: "productOwner"
            }];
            const team = [{
                _id: "teamID",
                maxmembers: 5,
                users: [{
                        _id: "productOwnerID",
                        email: "productowner@aversium.com",
                        role: "productOwner"
                    }       
                ]
            }];
            const checkTeam = createCheckTeam(team[0], productOwner[0]);
            try{
                const memberValidated = await checkTeam();
            }catch(err) {
                expect(err.message).toEqual("Ya existe product owner en el equipo");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si el scrumMaster no puede estar en el equipo', async () => {
            expect.assertions(2);
            const scrumMaster = [{
                _id: "scrumMasterID",
                email: "scrumMaster@aversium.com",
                role: "scrumMaster"
            }];
            const team = [{
                _id: "teamID",
                maxmembers: 5,
                users: [{
                        _id: "scrumMasterID",
                        email: "scrumMaster@aversium.com",
                        role: "scrumMaster"
                    }       
                ]
            }];
            const checkTeam = createCheckTeam(team[0], scrumMaster[0]);
            try{
                const memberValidated = await checkTeam();
            }catch(err) {
                expect(err.message).toEqual("Ya existe scrum master en el equipo");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si el developer ya esta en el equipo', async () => {
            expect.assertions(2);
            const developer = [{
                _id: "developerID",
                email: "developer@aversium.com",
                role: "developer"
            }];
            const team = [{
                _id: "teamID",
                maxmembers: 5,
                users: [{
                        _id: "developerID",
                        email: "developer@aversium.com",
                        role: "developer"
                    }       
                ]
            }];
            const checkTeam = createCheckTeam(team[0], developer[0]);
            try{
                const memberValidated = await checkTeam();
            }catch(err) {
                expect(err.message).toEqual("Este desarrollador ya esta en el equipo");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si no existe hueco en el equipo', async () => {
            expect.assertions(2);
            const developer = [{
                _id: "developerID",
                email: "developer@aversium.com",
                role: "developer"
            }];
            const team = [{
                _id: "teamID",
                maxmembers: 3,
                users: [{
                        _id: "developer1ID",
                        email: "developer1@aversium.com",
                        role: "developer"
                    },
                    {
                        _id: "developer2ID",
                        email: "developer2@aversium.com",
                        role: "developer"
                    },
                    {
                        _id: "developer3ID",
                        email: "developer3@aversium.com",
                        role: "developer"
                    },       
                ]
            }];
            const checkTeam = createCheckTeam(team[0], developer[0]);
            try{
                const memberValidated = await checkTeam();
            }catch(err) {
                expect(err.message).toEqual("No existe hueco en el equipo");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si no existe hueco en el equipo', async () => {
            expect.assertions(2);
            const productOwner = [{
                _id: "productOwner",
                email: "productOwner@aversium.com",
                role: "productOwner"
            }];
            const team = [{
                _id: "teamID",
                maxmembers: 3,
                users: [{
                        _id: "developer1ID",
                        email: "developer1@aversium.com",
                        role: "developer"
                    },
                    {
                        _id: "developer2ID",
                        email: "developer2@aversium.com",
                        role: "developer"
                    },
                    {
                        _id: "developer3ID",
                        email: "developer3@aversium.com",
                        role: "developer"
                    },       
                ]
            }];
            const checkTeam = createCheckTeam(team[0], productOwner[0]);
            try{
                const memberValidated = await checkTeam();
            }catch(err) {
                expect(err.message).toEqual("No existe hueco en el equipo");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si no existe hueco en el equipo', async () => {
            expect.assertions(2);
            const scrumMaster = [{
                _id: "scrumMaster",
                email: "scrumMaster@aversium.com",
                role: "scrumMaster"
            }];
            const team = [{
                _id: "teamID",
                maxmembers: 3,
                users: [{
                        _id: "developer1ID",
                        email: "developer1@aversium.com",
                        role: "developer"
                    },
                    {
                        _id: "developer2ID",
                        email: "developer2@aversium.com",
                        role: "developer"
                    },
                    {
                        _id: "developer3ID",
                        email: "developer3@aversium.com",
                        role: "developer"
                    },       
                ]
            }];
            const checkTeam = createCheckTeam(team[0], scrumMaster[0]);
            try{
                const memberValidated = await checkTeam();
            }catch(err) {
                expect(err.message).toEqual("No existe hueco en el equipo");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver error, si el usuario no tiene un rol permitido', async () => {
            expect.assertions(2);
            const user = [{
                _id: "errorRolID",
                email: "errorrol@aversium.com",
                role: "errorRol"
            }];
            const team =[{
                _id: "teamID",
                maxmembers: 5,
                users: [
                    {
                        _id: "productOwnerID",
                        email: "productOwner@aversium.com",
                        role: "productOwner"
                    }
                ]
            }];
            const checkTeam = createCheckTeam(team[0], user[0]);
            try{
                const memberValidated = await checkTeam();
                console.log(memberValidated);
            }catch(err) {
                expect(err.message).toEqual("No es ningún rol permitido");
                expect(err instanceof Error).toBeTruthy();
            };
        });
        it('Debe devolver el developer, si puede estar en el equipo', async () => {
            expect.assertions(1);
            const developer = [{
                _id: "developerID",
                email: "developer@aversium.com",
                role: "developer"
            }];
            const team =[{
                _id: "teamID",
                maxmembers: 5,
                users: [
                    {
                        _id: "productOwnerID",
                        email: "productOwner@aversium.com",
                        role: "productOwner"
                    }
                ]
            }];
            const checkTeam = createCheckTeam(team[0], developer[0]);
            try {
                const memberValidated = await checkTeam();
                expect(memberValidated).toEqual(developer[0]);     
            }catch(err) {
                throw err;
            };
        });
        it('Debe devolver error, si el usuario no esta definido', async () => {
            expect.assertions(2);
            const user = undefined;
            const team =[{
                _id: "teamID",
                maxmembers: 5,
                users: [
                    {
                        _id: "productOwnerID",
                        email: "productOwner@aversium.com",
                        role: "productOwner"
                    }
                ]
            }];
            const checkTeam = createCheckTeam(team[0], user);
            try{
                const memberValidated = await checkTeam();
            }catch(err) {
                expect(err.message).toEqual("Usuario no definido");
                expect(err instanceof Error).toBeTruthy();
            };
        });
    });
});