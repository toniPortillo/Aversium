'use strict';
const mongoose = require('mongoose');
const config = require('config');
const dbConfig = config.get('app.database');
const testHelper = require('../test/functionalTest/test_helper_test');

if(process.env.NODE_ENV === 'test') {
    testHelper();
}else {
    mongoose.connect(`mongodb://localhost/${dbConfig.dbName}`, function(err) {
        if(err) throw new Error(`Erroneously connected ${dbConfig.dbName}`);
        console.log(`Successfully connected ${dbConfig.dbName}`);
    })
}