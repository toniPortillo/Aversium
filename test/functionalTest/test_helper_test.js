'use strict';
const mongoose = require('mongoose');
const config = require('config');
const dbConfig = config.get('app.database');

module.exports = () =>  {

    mongoose.connect(`mongodb://localhost/${dbConfig.dbName}`);
    mongoose.connection
        .once('open', () => console.log(dbConfig.dbName + 'Connected!'))
        .on('error', (error) => {
            console.warm('Error : ', error);
        })
        
    beforeEach((done) => {
        mongoose.connection.on('open', () => {

            mongoose.connection.db.dropDatabase(() => {
                
                done();
            });    
        })
    });
}