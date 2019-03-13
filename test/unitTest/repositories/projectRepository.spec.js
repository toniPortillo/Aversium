const createProjectRepository = require('../../../repositories/projectRepository');

const mockProjectEntityCreateSuccess = (projectCreated) => ({
    find: jest.fn(() => new Promise((resolve) => resolve([]))),
    save: jest.fn(() => new Promise((resolve) => resolve(projectCreated)))
});

const mockProjectEntityGetAllSuccess = (listProject) => ({
    find: jest.fn(() => new Promise((resolve) => resolve(listProject))),  
});

const mockProjectEntityFindByParamSuccess = (projectFound) => ({
    find: jest.fn(() => new Promise((resolve) => resolve(projectFound)))
});

const mockProjectEntityRemoveByParamSuccess = (projectFound) => ({
    find: jest.fn(() => new Promise((resolve) => resolve(projectFound))),
    remove: jest.fn(() => new Promise((resolve) => resolve(projectFound[0])))
});


describe('Repositorio: Project', () => {
    describe('Metodo create', () => {
        it('Debe crear un proyecto, si este no existe', async () => {
            const user = {};
            const productBacklog = {};
            const kanban = {};
            const projectToCreate = {
                projectname: "PROJECTNAME",
                teams: [],
                responsable: user,
                productBacklog: productBacklog,
                kanban: kanban,
                sprints: [],
                client: "PROJECTCLIENT",
                startdate: new Date,
                deadline: new Date
            };
            const projectEntity = mockProjectEntityCreateSuccess(projectToCreate);
            const projectRepository = createProjectRepository(projectEntity);
            
            expect.assertions(2);
            const project = await projectRepository.create(projectToCreate.projectname, projectToCreate.responsable,
                projectToCreate.productBacklog, projectToCreate.kanban ,projectToCreate.client, projectToCreate.deadline);
            expect(projectEntity.find).toBeCalledWith({projectname: projectToCreate.projectname});
            expect(project).toEqual(projectToCreate);
        })
    });

    describe('Metodo getAll', () => {
        it('Debe llenar un array con los proyectos', async () => {
            const projectListToCreate = [
                project1 = {},
                project2 = {}
            ];

            const projectEntity = mockProjectEntityGetAllSuccess(projectListToCreate);
            const projectRepository = createProjectRepository(projectEntity);
            const projectList = await projectRepository.getAll();
            expect(projectEntity.find).toBeCalledWith({});
            expect(projectList).toEqual(projectListToCreate);
            expect.assertions(2);
        });
    });

    describe('Metodo findOneByName', () => {
        it('Debe devolver el proyecto, si lo encuentra por el nombre', async () => {
            const projectToFind = [{
                projectname: "PROJECTNAME"
            }];

            const projectEntity = mockProjectEntityFindByParamSuccess(projectToFind);
            const projectRepository = createProjectRepository(projectEntity);
            const project = await projectRepository.findOneByName(projectToFind[0].projectname);
            expect(projectEntity.find).toBeCalledWith({projectname: projectToFind[0].projectname});
            expect(project).toEqual(projectToFind);
            expect.assertions(2);
        });
    });

    describe('Metodo findById', () => {
        it('Debe devolver el proyecto, si lo encuentra por el id', async () => {
            const projectToFind = [{
                _id: "PROJECTID"
            }];

            const projectEntity = mockProjectEntityFindByParamSuccess(projectToFind);
            const projectRepository = createProjectRepository(projectEntity);
            const project = await projectRepository.findOneById(projectToFind[0]._id);
            expect(projectEntity.find).toBeCalledWith({_id: projectToFind[0]._id});
            expect(project).toEqual(projectToFind);
            expect.assertions(2); 
        });        
    });
    
    describe('Metodo removeById', () => {
        it('Debe eliminar el proyecto, si lo encuentra por el id', async () => {
            const projectToFind = [{
                _id: "PROJECTID"
            }];

            const projectEntity = mockProjectEntityRemoveByParamSuccess(projectToFind);
            const projectRepository = createProjectRepository(projectEntity);
            const project = await projectRepository.removeById(projectToFind[0]._id);
            expect(projectEntity.find).toBeCalledWith({_id: projectToFind[0]._id});
            expect(project).toEqual(projectToFind);
            expect.assertions(2);
        })
    })
});
