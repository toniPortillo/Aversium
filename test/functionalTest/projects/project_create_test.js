'use strict'
const assert = require('chai').assert;
const Project = require('../../../models/mongoModels/projectModel').Project;

describe('Creating document', () => {
    
    it('creates a project', (done) => {

        const project = new Project({ projectname: "Prueba"});
        project.save()
        .then(() => {
            assert(!project.isNew);
            done();
        });
    });
});