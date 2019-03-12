'use strict';
module.exports = (db, Schemas) => {
    const productBacklogSchemas = {
        productBacklog: new db.Schema({
            startDate: {type: Date, default: Date.now},
            productOwner: {type: [Schemas.user], require: true},
            requirements: {type: String}
        })
    };

    return productBacklogSchemas;
};