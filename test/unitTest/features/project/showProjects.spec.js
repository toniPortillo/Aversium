const showProjects = require('../../../../actions/project/showProjects');

const mockProjectRepositorygetAllSuccess = listProjects => ({
    getAll: jest.fn(() => new Promise((resolve) => resolve(listProjects)))
});

const mockProjectRepositorygetAllEmpty = listProjects => ({
    getAll: jest.fn(() => new Promise((resolve) => resolve(listProjects)))
});

describe('Action Projects', () => {
    describe('Metodo showProjects', () => {
        it('Debe obtener la lista de proyectos, si no esta vacia', async () => {
            expect.assertions(2);
            try {
                const user = {_id: "_id"};
                const productBacklog = {_id: "_id"};
                const kanban = {_id: "_id"};
                const projectToCreate1 = {
                    projectname: "PROJECTNAME",
                    teams: [],
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
                    teams: [],
                    responsable: user,
                    productBacklog: productBacklog,
                    kanban: kanban,
                    sprints: [],
                    client:"PROJECTCLIENT",
                    startdate: new Date,
                    deadline: new Date
                };
                const listProjects = [projectToCreate1, projectToCreate2];
                const projectRepository = mockProjectRepositorygetAllSuccess(listProjects);
                const projectAction = showProjects(projectRepository);
                const list = await projectAction();
                expect(list).toEqual(listProjects);
                expect(projectRepository.getAll).toBeCalledWith();
            }catch(err) {
            }
        });
        it('Debe devolver [], si la lista esta vacia', async () => {
            expect.assertions(2);
            try {
                const listProjects = []
                const projectRepository = mockProjectRepositorygetAllEmpty(listProjects);
                const projectAction = showProjects(projectRepository);
                const list = await projectAction();
                expect(list).toEqual(listProjects);
                expect(projectRepository.getAll).toBeCalledWith();
            }catch (err) {
            }
        });
        it('Debe devolver error, si la lista no esta definida', async () => {
            try {
                const projectRepository = mockProjectRepositoryListFailure();
                const projectAction = showProjects(projectRepository);
                const list = await projectAction();
            }catch(err) {

            }
        })
    });
});
