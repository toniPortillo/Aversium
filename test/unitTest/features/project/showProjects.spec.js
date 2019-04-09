const showProjects = require('../../../../actions/project/showProjects');

const mockProjectRepositorygetAllSuccess = listProjects => ({
    getAll: jest.fn(() => new Promise((resolve) => resolve(listProjects)))
});

const mockProjectRepositorygetAllEmpty = listProjects => ({
    getAll: jest.fn(() => new Promise((resolve) => resolve(listProjects)))
});

const mockProjectRepositoryListFailure = () => ({
    getAll: jest.fn(() => new Promise((reject) => reject(new Error("Lista de proyectos no definida"))))
}); 

const mockProjectRepositoryListFailure2 = (listProjects) => ({
    getAll: jest.fn(() => new Promise((resolve) => resolve(listProjects)))
});

describe('Action Projects', () => {
    describe('Metodo showProjects', () => {
        it('Debe obtener la lista de proyectos, si no esta vacia', async () => {
            expect.assertions(2);
            try {
                const user = {_id: "_id"};
                const team1 = {teamname: "TEAMNAME1"};
                const team2 = {teamname: "TEAMNAME2"};
                const productBacklog = {_id: "_id"};
                const kanban = {_id: "_id"};
                const projectToCreate1 = {
                    projectname: "PROJECTNAME",
                    teams: [team1],
                    responsable: user,
                    productBacklog: productBacklog,
                    kanban: kanban,
                    sprints: [],
                    client:"PROJECTCLIENT",
                    startdate: new Date,
                    deadline: new Date
                };
                const projectToCreate2 = {
                    projectname: "PROJECTNAME",
                    teams: [team1, team2],
                    responsable: user,
                    productBacklog: productBacklog,
                    kanban: kanban,
                    sprints: [],
                    client:"PROJECTCLIENT",
                    startdate: new Date,
                    deadline: new Date
                };
                const listProjects = [projectToCreate1, projectToCreate2];
                const listTeamProjects = [projectToCreate2];
                const projectRepository = mockProjectRepositorygetAllSuccess(listProjects);
                const projectAction = showProjects(projectRepository);
                const list = await projectAction(team2);
                expect(list).toEqual(listTeamProjects);
                expect(projectRepository.getAll).toBeCalledWith();
            }catch(err) {
            }
        });
        it('Debe devolver [], si el equipo no pertenece a ningun proyecto', async () => {
            expect.assertions();
            try {
                const user = {_id: "_id"};
                const team1 = {teamname: "TEAMNAME1"};
                const team2 = {teamname: "TEAMNAME2"};
                const productBacklog = {_id: "_id"};
                const kanban = {_id: "_id"};
                const projectToCreate1 = {
                    projectname: "PROJECTNAME",
                    teams: [team1],
                    responsable: user,
                    productBacklog: productBacklog,
                    kanban: kanban,
                    sprints: [],
                    client:"PROJECTCLIENT",
                    startdate: new Date,
                    deadline: new Date
                };
                const projectToCreate2 = {
                    projectname: "PROJECTNAME",
                    teams: [team1],
                    responsable: user,
                    productBacklog: productBacklog,
                    kanban: kanban,
                    sprints: [],
                    client:"PROJECTCLIENT",
                    startdate: new Date,
                    deadline: new Date
                };
                const listProjects = [projectToCreate1, projectToCreate2];
                const listTeamProjects = [];
                const projectRepository = mockProjectRepositorygetAllSuccess(listProjects);
                const projectAction = showProjects(projectRepository);
                const list = await projectAction(team2);
                expect(list).toEqual(listTeamProjects);
            }catch(err) {
            }
        });
        it('Debe devolver [], si la lista esta vacia', async () => {
            expect.assertions(2);
            try {
                const listProjects = [];
                const team = {teamname: "TEAMNAME"};
                const projectRepository = mockProjectRepositorygetAllEmpty(listProjects);
                const projectAction = showProjects(projectRepository);
                const list = await projectAction(team);
                expect(list).toEqual(listProjects);
                expect(projectRepository.getAll).toBeCalledWith();
            }catch (err) {
            }
        });
        it('Debe devolver error, si la lista no esta definida', async () => {
            expect.assertions(2);
            try {
                const projectRepository = mockProjectRepositoryListFailure();
                const projectAction = showProjects(projectRepository);
                const list = await projectAction();
            }catch(err) {
                expect(err.message).toEqual("Lista de proyectos no definida");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si la lista para filtrar por equipo no esta definida', async () => {
            expect.assertions(2);
            try {
                const listProjects = undefined;
                const projectRepository = mockProjectRepositoryListFailure2(listProjects);
                const projectAction = showProjects(projectRepository);
                const list = await projectAction();
            }catch(err) {
                expect(err.message).toEqual("Lista o equipo no definidos");
                expect(err instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el equipo para filtrar por equipo no esta definido', async () => {
            expect.assertions(2);
            try {
                const user = {_id: "_id"};
                const team1 = {teamname: "TEAMNAME1"};
                const team2 = undefined;
                const productBacklog = {_id: "_id"};
                const kanban = {_id: "_id"};
                const projectToCreate1 = {
                    projectname: "PROJECTNAME",
                    teams: [team1],
                    responsable: user,
                    productBacklog: productBacklog,
                    kanban: kanban,
                    sprints: [],
                    client:"PROJECTCLIENT",
                    startdate: new Date,
                    deadline: new Date
                };
                const projectToCreate2 = {
                    projectname: "PROJECTNAME",
                    teams: [team1, team2],
                    responsable: user,
                    productBacklog: productBacklog,
                    kanban: kanban,
                    sprints: [],
                    client:"PROJECTCLIENT",
                    startdate: new Date,
                    deadline: new Date
                };
                const listProjects = [projectToCreate1, projectToCreate2];
                const listTeamProjects = [projectToCreate2];
                const projectRepository = mockProjectRepositorygetAllSuccess(listProjects);
                const projectAction = showProjects(projectRepository);
                const list = await projectAction(team2);
            }catch(err) {
                expect(err.message).toEqual("Lista o equipo no definidos");
                expect(err instanceof Error).toBeTruthy();
            }
        });
    });
});
