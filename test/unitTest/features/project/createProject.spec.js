'use strict';
const createProject = require('../../../../actions/project/createProject');

const mockProjectRepositoryCreateSuccess = (projectCreated) => ({
    create: jest.fn(() => new Promise((resolve) => resolve(projectCreated)))
});
const mockProjectRepositoryCreateFailure = () => {
    create: jest.fn(() => new Promise((reject) => reject(new Error('Error'))))
};
const mockProjectRepositoryCreateEmpty = () => {
    create: jest.fn(() => new Promise((reject) => reject(new Error('Error'))))
};
const mockProjectRepositoryCreateExits = (projectCreated) => ({
    create: jest.fn(() => new Promise((reject) => reject(new Error('Proyecto ya existente'))))
});

describe('Action Project', () => {
    describe('Metodo createProject', () => {
        it('Debe crear un proyecto, si todo esta correcto', async () => {
            const user = {_id: "_id"};
            const productBacklog = {_id: "_id"};
            const kanban = {_id: "_id"};
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
                project: projectToCreate,
                message: "Proyecto creado exitosamente"
            }
            
            const projectRepository = mockProjectRepositoryCreateSuccess(projectToCreate);
            const projectAction = createProject(projectRepository);
            const project = await projectAction(projectToCreate);
            expect.assertions(2);
            expect(projectRepository.create).toBeCalledWith(projectToCreate.projectname,
                projectToCreate.responsable, projectToCreate.productBacklog, projectToCreate.kanban,
                projectToCreate.client, projectToCreate.deadline);
            expect(project).toEqual(projectCreated);
        });
        it('Debe devolver errores de validacion, si algun parametro es incorrecto', async () => {
            const user = "Error";
            const productBacklog = "Error";
            const kanban = "Error";
            const projectToCreate = {
               projectname: 1,
               teams: [],
               responsable: user,
               productBacklog: productBacklog,
               kanban: kanban,
               sprints: [],
               client: 2,
               startdate: new Date,
               deadline: 3 
            };
            
            const projectRepository = mockProjectRepositoryCreateFailure();
            const projectAction = createProject(projectRepository);
            expect.assertions(1);
            try {
                const project = await projectAction(projectToCreate);
            }catch (error){
                expect(error instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si se pasa un proyecto vacio', async () => {
            const projectToCreate = [];
            const projectRepository = mockProjectRepositoryCreateEmpty();
            const projectAction = createProject(projectRepository);
            expect.assertions(2);
            try {
                const project = await projectAction(projectToCreate);
            }catch(error) {
                expect(error.message).toEqual("Proyecto vacio");
                expect(error instanceof Error).toBeTruthy();
            }
        });
        it('Debe devolver error, si el proyecto ya existe', async () => {
            const user = {_id: "_id"};
            const productBacklog = {_id: "_id"};
            const kanban = {_id: "_id"};
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
            };
            const projectRepository = mockProjectRepositoryCreateExits(projectToCreate);
            const projectAction = createProject(projectRepository);
            expect.assertions(3);
            try {
                const project = await projectAction(projectToCreate);
            }catch(error) {
                expect(projectRepository.create).toBeCalledWith(projectToCreate.projectname,
                    projectToCreate.responsable, projectToCreate.productBacklog, projectToCreate.kanban,
                    projectToCreate.client, projectToCreate.deadline);
                expect(error.message).toEqual("Proyecto ya existente");
                expect(error instanceof Error).toBeTruthy();
            }
        })
    });
});