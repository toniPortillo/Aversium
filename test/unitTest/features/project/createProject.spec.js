const createProject = require('../../../../actions/project/createProject');

const mockProjectRepositoryCreateSuccess = (projectCreated) => ({
    create: jest.fn(() => new Promise((resolve) => resolve(projectCreated)))
});

describe('Action createProject', () => {
    describe('createProject successful', () => {
        it('Debe crear un proyecto', async () => {
            const user = {_id: "_id"};
            const productBacklog = {_id: "_id"};
            const kanban = {_id: "_id"}
            const projectToCreate = {
                projectname: "PROJECTNAME",
                teams: [],
                responsable: user,
                productBacklog: productBacklog,
                kanban: kanban,
                sprints: [],
                client:"PROJECTCLIENT",
                startdate: new Date,
                deadline: new Date
            }
            const projectCreated = {
                projectToCreate: projectToCreate,
                message: "Proyecto creado exitosamente"
            }
            
            const projectRepository = mockProjectRepositoryCreateSuccess(projectToCreate);
            const projectAction = createProject(projectRepository);
            const project =  await projectAction._createProject(projectToCreate);
            expect(projectRepository.create).toBeCalledWith(projectToCreate.projectname,
                projectToCreate.responsable, projectToCreate.productBacklog, projectToCreate.kanban,
                projectToCreate.client, projectToCreate.deadline);
            expect(project).toEqual(projectCreated);
            expect.assertions(2);
        });
    });
});