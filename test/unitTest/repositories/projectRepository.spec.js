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

const mockProjectEntityModifyTeamSuccess = (projectFound, projectModify) => ({
    find: jest.fn(() => new Promise(resolve => resolve(projectFound))),
    findOneAndUpdate: jest.fn(() => new Promise(resolve => resolve(projectModify)))
});

const mockProjectEntityModifySprintSuccess = (projectFound, projectModify) => ({
    find: jest.fn(() => new Promise(resolve => resolve(projectFound))),
    findOneAndUpdate: jest.fn(() => new Promise(resolve => resolve(projectModify)))
});

describe('Repositorio: Project', () => {
    describe('Metodo create', () => {
        it('Debe guardar un proyecto en la bd, si este no existe', async () => {
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
            
            const project = await projectRepository.create(projectToCreate.projectname, projectToCreate.responsable,
                projectToCreate.productBacklog, projectToCreate.kanban ,projectToCreate.client, projectToCreate.deadline);
            expect.assertions(8);
            expect(typeof projectToCreate.projectname).toBe('string');
            expect(projectToCreate.responsable).toBeDefined();
            expect(projectToCreate.productBacklog).toBeDefined();
            expect(projectToCreate.kanban).toBeDefined();
            expect(typeof projectToCreate.client).toBe('string');
            expect(typeof projectToCreate.deadline).toBe('object');
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
            expect.assertions(2);
            expect(projectEntity.find).toBeCalledWith({});
            expect(projectList).toEqual(projectListToCreate);
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
            expect.assertions(2);
            expect(projectEntity.find).toBeCalledWith({projectname: projectToFind[0].projectname});
            expect(project).toEqual(projectToFind);
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
            expect.assertions(2); 
            expect(projectEntity.find).toBeCalledWith({_id: projectToFind[0]._id});
            expect(project).toEqual(projectToFind);
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
            expect.assertions(3);
            expect(projectEntity.find).toBeCalledWith({_id: projectToFind[0]._id});
            expect(projectEntity.remove).toBeCalledWith({_id: projectToFind[0]._id})
            expect(project).toEqual(projectToFind[0]);
        })
    });

    describe('Metodo modifyTeam', () => {
        it('Debe permitir añadir un equipo al proyecto', async () => {
            expect.assertions(3);
            const projectToModify = [{
                _id: "PROJECTID",
                teams: []
            }];
            
            const team1 = {
                _id: "TEAMID",
                teamname: "TEAMNAME"
            };

            const projectModify = [{
                _id: "PROJECTID",
                teams: [team1]
            }];
            try {
                const projectEntity = mockProjectEntityModifyTeamSuccess(projectToModify, projectModify);
                const projectRepository = createProjectRepository(projectEntity);
                const project = await projectRepository.modifyTeam(projectToModify[0]._id, team1);
                expect(projectEntity.find).toBeCalledWith({_id: projectToModify[0]._id});
                expect(projectEntity.findOneAndUpdate).toBeCalledWith({_id: projectToModify[0]._id}, {teams: team1});
                expect(project).toEqual(projectModify);
            }catch(err) {
                throw err;
            }
        }),
        it('Debe permitir borrar un equipo al proyecto', async () => {
            expect.assertions(3);

            const team1 = {
                _id: "TEAMID",
                teamname: "TEAMNAME"
            };

            const projectToModify = [{
                _id: "PROJECTID",
                teams: [team1]
            }];

            const projectModify = [{
                _id: "PROJECTID",
                teams: []
            }];

            try {
                const projectEntity = mockProjectEntityModifyTeamSuccess(projectToModify, projectModify);
                const projectRepository = createProjectRepository(projectEntity);
                const project = await projectRepository.modifyTeam(projectToModify[0]._id, team1);
                expect(projectEntity.find).toBeCalledWith({_id: projectToModify[0]._id});
                expect(projectEntity.findOneAndUpdate).toBeCalledWith({_id: projectToModify[0]._id}, {teams: team1});
                expect(project).toEqual(projectModify);
            }catch(err) {
                throw err;
            }
        })
    });
    describe('Metodo modifySprint', () => {
        it('Debe permitir añadir un sprint al proyecto', async () => {
            expect.assertions(3);

            const projectToModify = [{
                _id: "PROJECTID",
                sprints: []
            }];

            const sprint1 = [{
                _id: "SPRINTID"
            }];

            const projectModify = [{
                _id: "PROJECTID",
                sprints: [sprint1]
            }];

            try {
                const projectEntity = mockProjectEntityModifySprintSuccess(projectToModify, projectModify);
                const projectRepository = createProjectRepository(projectEntity);
                const project = await projectRepository.modifySprint(projectToModify[0]._id, sprint1);
                expect(projectEntity.find).toBeCalledWith({_id: projectToModify[0]._id});
                expect(projectEntity.findOneAndUpdate).toBeCalledWith({_id: projectToModify[0]._id}, {sprints: sprint1});
                expect(project).toEqual(projectModify);
            }catch(err) {
                throw err;
            }
            
        })
    })
});
