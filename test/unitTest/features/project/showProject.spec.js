'use strict';
const showProject = require('../../../../actions/project/showProject');

describe('Action project', () => {
    describe('Metodo showProject', () => {
        it('Debe obtener el proyecto, si este existe', async () => {
            expect.assertions();
            try {
                const user = {_id: "_id"};
                const team1 = {
                    teamname: "TEAMNAME1",
                    users: };
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
            }catch(err) {

            }
        });
    });
});