'use strict';
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('config');
const dbSessionsConfig = config.get('app.database');

var store = new MongoDBStore({
    uri:`mongodb://localhost/${dbSessionsConfig.dbNameSessions}`,
    collection: 'mySessions'
},
(error) => {
    
    if(error) trow(error);
    console.log(`Successfully connected ${dbSessionsConfig.dbNameSessions}`);
});

module.exports = store;