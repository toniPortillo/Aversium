const createProject = require('../../../../actions/project/createProject');

const mockProjectRepositoryCreateSuccess = (projecCreated) => {
    _createProject: jest.fn(() => new Promise((resolve) => {resolve((projecCreated))}));
}

describe('Action createProject', () => {
    describe('createProject successful'), () => {
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
            
            const projectRepository = mockProjectRepositoryCreateSuccess(projectCreated);
            const projectAction = createProject._createProject()
        });
    }
})