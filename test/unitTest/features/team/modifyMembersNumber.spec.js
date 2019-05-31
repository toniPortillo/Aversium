'use strict';

const modifyMembersNumber = require('../../../../actions/team/modifyMembersNumber');

describe('Action team', () => {
    describe('Metodo: modifyMembersNumber', () => {
        it('Debe devolver el equipo modificado, si este existe', async () => {
            expect.assertions(2);
            const creator = [{
                _id: "creatorId"
            }];
            const teamToModify = [{
                _id: "teamId",
                teamname: "teamtToModify",
                creator: creator,
                maxmembers:3
            }];
            try {

            }catch(err) {
                throw err;
            }
        });
    });
});