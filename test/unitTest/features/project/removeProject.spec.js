'use strict';
const removeProject = require('../../../../actions/project/removeProject');

const mockProjectRepositoryRemoveByIdSuccess = project => ({
    removeById: jest.fn(() => new Promise(resolve => resolve(project)))
});

describe('Action project', () => {
    describe('Metodo removeProject', () => {
        it('Debe devolver el proyecto borrado, si este existe para ser borrado', async () => {
            expect.assertions(2);
            try{
                const user = {_id: "_id"};
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
                const productBacklog = { _id: "_id"};
                const kanban = { _id: "_id"};
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
                const projectRepository = mockProjectRepositoryRemoveByIdSuccess(project);
                const projectAction = removeProject(projectRepository);
                const resultingProject = await projectAction(project._id, user);
                expect(resultingProject).toEqual(project);
                expect(projectRepository.removeById).toBeCalledWith(project._id);
            }catch(err)  {
            }
        });
    });
});