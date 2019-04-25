'use strict';
const removeProject = require('../../../../actions/project/removeProject');

const mockProjectRepositoryRemoveByIdSuccess = project => ({
    removeById: jest.fn(() => new Promise(resolve => resolve(project)))
});

const mockProjectRepositoryRemoveByIdFailure = project => ({
    removeById: jest.fn(() => new Promise(reject => 
        reject(new Error("Proyecto no encontrado. No, se realizó borrado de proyecto"))))
});

describe('Action project', () => {
    describe('Metodo removeProject', () => {
        it('Debe devolver el proyecto borrado, si este existe para ser borrado', async () => {
            expect.assertions(2);
            try{
                const user = { _id: "_id" };
                const users1 = [
                    {
                        _id: "_id1",
                        username: "USERNAME1"
                    },
                    {
                        _id: "_id2",
                        username: "USERNAME2"
                    }
                ];
                const users2 = [
                    {
                        _id: "_id3",
                        username: "USERNAME3"
                    },
                    {
                        _id: "_id4",
                        username: "USERNAME4"
                    }
                ];
                const team1 = {
                    teamname: "TEAMNAME1",
                    users: users1
                };
                const team2 = {
                    teamname: "TEAMNAME2",
                    users: users2
                };
                const productBacklog = { _id: "_id" };
                const kanban = { _id: "_id" };
                const projectToRemove = {
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
                const projectRemoved = {
                    project: projectToRemove,
                    message: "Proyecto eliminado exitosamente"
                };
                
                const projectRepository = mockProjectRepositoryRemoveByIdSuccess(projectToRemove);
                const projectAction = removeProject(projectRepository);
                const resultingProject = await projectAction(projectToRemove, user);
                expect(resultingProject).toEqual(projectRemoved);
                expect(projectRepository.removeById).toBeCalledWith(projectToRemove._id);
            }catch(err)  {
            }
        });
        it('Debe devolver error, si el proyecto no esta definido', async () => {
            expect.assertions(2);
            try {
                const user = { _id: "_id" };
                const projectToRemove = undefined;
                
                const projectRepository = mockProjectRepositoryRemoveByIdSuccess(projectToRemove);
                const projectAction = removeProject(projectRepository);
                const resultingProject = await projectAction(projectToRemove, user);
            }catch(err) {
                expect(err.message).toEqual("Proyecto no definido");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el responsable no esta definido', async () => {
            expect.assertions(2);
            try {
                const user = undefined;
                const users1 = [
                    {
                        _id: "_id1",
                        username: "USERNAME1"
                    },
                    {
                        _id: "_id2",
                        username: "USERNAME2"
                    }
                ];
                const users2 = [
                    {
                        _id: "_id3",
                        username: "USERNAME3"
                    },
                    {
                        _id: "_id4",
                        username: "USERNAME4"
                    }
                ];
                const team1 = {
                    teamname: "TEAMNAME1",
                    users: users1
                };
                const team2 = {
                    teamname: "TEAMNAME2",
                    users: users2
                };
                const productBacklog = { _id: "_id" };
                const kanban = { _id: "_id" };
                const projectToRemove = {
                    _id: "_idProject",
                    projectname: "PROJECTNAME",
                    teams: [team1, team2],
                    responsable: users2[0],
                    productBacklog: productBacklog,
                    kanban: kanban,
                    sprints: [],
                    client: "PROJECTCLIENT",
                    startdate: new Date,
                    deadline: new Date
                };
                const projectRepository = mockProjectRepositoryRemoveByIdSuccess(projectToRemove);
                const projectAction = removeProject(projectRepository);
                const resultingProject = await projectAction(projectToRemove, user);
            }catch(err) {
                expect(err.message).toEqual("Responsable no definido");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el usuario que quiere eliminar el proyecto no es su responsable', async () => {
            expect.assertions(2);
            try {
                const user = { _id: "_id" };
                const users1 = [
                    {
                        _id: "_id1",
                        username: "USERNAME1"
                    },
                    {
                        _id: "_id2",
                        username: "USERNAME2"
                    }
                ];
                const users2 = [
                    {
                        _id: "_id3",
                        username: "USERNAME3"
                    },
                    {
                        _id: "_id4",
                        username: "USERNAME4"
                    }
                ];
                const team1 = {
                    teamname: "TEAMNAME1",
                    users: users1
                };
                const team2 = {
                    teamname: "TEAMNAME2",
                    users: users2
                };
                const productBacklog = { _id: "_id" };
                const kanban = { _id: "_id" };
                const projectToRemove = {
                    _id: "_idProject",
                    projectname: "PROJECTNAME",
                    teams: [team1, team2],
                    responsable: users2[0],
                    productBacklog: productBacklog,
                    kanban: kanban,
                    sprints: [],
                    client: "PROJECTCLIENT",
                    startdate: new Date,
                    deadline: new Date
                };
                const projectRepository = mockProjectRepositoryRemoveByIdSuccess(projectToRemove);
                const projectAction = removeProject(projectRepository);
                const resultingProject = await projectAction(projectToRemove, user);
            }catch(err) {
                expect(err.message).toEqual("No puede eliminar el proyecto, por no ser su responable");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el proyecto que se quiere eliminar no es encontrado', async () => {
            try {
                const user = { _id: "_id" };
                const users1 = [
                    {
                        _id: "_id1",
                        username: "USERNAME1"
                    },
                    {
                        _id: "_id2",
                        username: "USERNAME2"
                    }
                ];
                const users2 = [
                    {
                        _id: "_id3",
                        username: "USERNAME3"
                    },
                    {
                        _id: "_id4",
                        username: "USERNAME4"
                    }
                ];
                const team1 = {
                    teamname: "TEAMNAME1",
                    users: users1
                };
                const team2 = {
                    teamname: "TEAMNAME2",
                    users: users2
                };
                const productBacklog = { _id: "_id" };
                const kanban = { _id: "_id" };
                const projectToRemove = {
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
                
                const projectRepository = mockProjectRepositoryRemoveByIdSuccess(projectToRemove);
                const projectAction = removeProject(projectRepository);
                const resultingProject = await projectAction(projectToRemove, user);
            }catch(err) {
                expect(err.message).toEqual("Proyecto no encontrado. No, se realizó borrado de proyecto");
                expect(err instanceof Error).toBeTruthy();
            }
        });
    });
});