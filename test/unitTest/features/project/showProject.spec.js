'use strict';
const showProject = require('../../../../actions/project/showProject');

const mockProjectRepositoryfindOneByNameSuccess = project => ({
    findOneByName: jest.fn(() => new Promise((resolve) => resolve(project)))
});

const mockProjectRepositoryfindOneByNameFailure =  project => ({
    findOneByName: jest.fn(() => new Promise((reject) => reject(new Error("Proyecto no encontrado"))))
});

const mockProjectRepositoryProjectUndefined = project => ({
    findOneByName: jest.fn(() => new Promise((resolve) => resolve(undefined)))
});

describe('Action project', () => {
    describe('Metodo showProject', () => {
        it('Debe obtener el proyecto, si este existe', async () => {
            expect.assertions(2);
            try {
                const user = {_id: "_id"};
                const userTeam2 = {
                    _id: "_id3",
                    username: "USERNAME3"
                };
                const users1 = [
                    {
                        _id: "_id1",
                        username: "USERNAME1"},
                    {
                        _id: "_id2",
                        username: "USERNAME2"
                    }];
                const users2 = [
                    {
                        _id: "_id3",
                        username: "USERNAME3"
                    },
                    {
                        _id: "_id4",
                        username: "USERNAME4"
                    }];
                const team1 = {
                    teamname: "TEAMNAME1",
                    users: users1
                };
                const team2 = {
                    teamname: "TEAMNAME2",
                    users: users2
                };
                const productBacklog = {_id: "_id"};
                const kanban = {_id: "_id"};
                const project = {
                    _id: "_idProject",
                    projectname: "PROJECTNAME",
                    teams: [team1, team2],
                    responsable: user,
                    productBacklog: productBacklog,
                    kanban: kanban,
                    sprints: [],
                    client: "PROJECTCLIENT",
                    startdate: new Date,
                    deadline: new Date
                };
                const projectRepository = mockProjectRepositoryfindOneByNameSuccess(project);
                const projectAction = showProject(projectRepository);
                const resultingProject = await projectAction(project.projectname, userTeam2);
                expect(resultingProject).toEqual(project);
                expect(projectRepository.findOneByName).toBeCalledWith(project.projectname);
            }catch(err) {
            }
        });
        it('Debe devolver error, si el nombre del proyecto no esta definido', async () => {
            expect.assertions(2);
            try {
                const project = {
                    projectname: undefined
                };
                const userTeam1 = {
                    _id: "_id1",
                    username: "USERNAME1"
                };

                const projectRepository = mockProjectRepositoryfindOneByNameSuccess(project);
                const projectAction = showProject(projectRepository);
                const resultingProject = await projectAction(project.projectname, userTeam1);
            }catch(err) {
                expect(err.message).toEqual("Nombre de proyecto no definido");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el proyecto no es encontrado', async () => {
            expect.assertions(2);
            try {
                const project = {
                    projectname: "PROJECTNAME"
                };
                const userTeam1 = {
                    _id: "_id1",
                    username: "USERNAME1"
                };

                const projectRepository = mockProjectRepositoryfindOneByNameFailure(project);
                const projectAction = showProject(projectRepository);
                const resultingProject = await projectAction(project.projectname, userTeam1); 
            }catch(err) {
                expect(err.message).toEqual("Proyecto no encontrado");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el proyecto no esta definido', async () => {
            expect.assertions(2);
            try {
                const project = {
                    projectname: "PROJECTNAME"
                };
                const userTeam1 = {
                    _id: "_id1",
                    username: "USERNAME1"
                };

                const projectRepository = mockProjectRepositoryProjectUndefined(project);
                const projectAction = showProject(projectRepository);
                const resultingProject = await projectAction(project.projectname, userTeam1);
            }catch(err) {
                expect(err.message).toEqual("Proyecto o usuario no definidos");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el usuario no esta definido', async () => {
            expect.assertions(2);
            try {
                const project = {
                    projectname: "PROJECTNAME"
                };

                const userTeam1 = undefined

                const projectRepository = mockProjectRepositoryfindOneByNameSuccess(project);
                const projectAction = showProject(projectRepository);
                const resultingProject = await projectAction(project.projectname, userTeam1);
            }catch(err) {
                expect(err.message).toEqual("Proyecto o usuario no definidos");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el usuario no pertenece a equipos del proyecto', async () => {
            expect.assertions(2);
            try {
                const user = {_id: "_id"};
                const userTeam2 = {
                    _id: "_id3",
                    username: "USERNAME3"
                };
                const users1 = [
                    {
                        _id: "_id1",
                        username: "USERNAME1"},
                    {
                        _id: "_id2",
                        username: "USERNAME2"
                    }];
                const users2 = [
                    {
                        _id: "_id3",
                        username: "USERNAME3"
                    },
                    {
                        _id: "_id4",
                        username: "USERNAME4"
                    }];
                const team1 = {
                    teamname: "TEAMNAME1",
                    users: users1
                };
                const team2 = {
                    teamname: "TEAMNAME2",
                    users: users2
                };
                const productBacklog = {_id: "_id"};
                const kanban = {_id: "_id"};
                const project = {
                    _id: "_idProject",
                    projectname: "PROJECTNAME",
                    teams: [team1, team2],
                    responsable: user,
                    productBacklog: productBacklog,
                    kanban: kanban,
                    sprints: [],
                    client: "PROJECTCLIENT",
                    startdate: new Date,
                    deadline: new Date
                };
                const projectRepository = mockProjectRepositoryfindOneByNameSuccess(project);
                const projectAction = showProject(projectRepository);
                const resultingProject = await projectAction(project.projectname, userTeam2);
            }catch(err) {
                expect(err.message).toEqual("El usuario no pertenece a equipos del proyecto");
                expect(err instanceof Erro).toBeTruthy();
            }
        });
    });
});