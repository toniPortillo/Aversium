'use strict';
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('config');
const dbSessionsConfig = config.get('app.database');

const store = new MongoDBStore({
    uri:`mongodb://localhost/${dbSessionsConfig.dbNameSessions}`,
    collection: 'mySessions'
}, (err) => {
    if(err) throw new Error(`Erroneously connected ${dbSessionsConfig.dbNameSessions}`);
    console.log(`Successfully connected ${dbSessionsConfig.dbNameSessions}`);
});

module.exports = store;