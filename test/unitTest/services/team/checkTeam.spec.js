'use strict';
const createCheckTeam = require('../../../../services/team/checkTeam');

describe('Services team', () => {
    describe('Service checkTeam', () => {
        it('Debe devolver el productOwner, si puede estar en el equipo', async () => {
            expect.assertions(1);
            const productOwner = [{
                _id: "productOwnerID",
                email: "productowner@aversium.com",
                role: "productOwner"
            }];
            const team = [{
                _id: "teamID",
                maxmembers: 5,
                users: [
                    {
                        _id: "scrumMasterID",
                        email: "scrummaster@aversium.com",
                        role: "scrumMaster"
                    }
                ]
            }];
            const checkTeam = createCheckTeam(team[0], productOwner[0]);
            try{
                const memberValidated = checkTeam();
                expect(memberValidated[0]).toEqual(productOwner[0]);
            }catch(err) {
                throw err;
            };
        });
    });
});