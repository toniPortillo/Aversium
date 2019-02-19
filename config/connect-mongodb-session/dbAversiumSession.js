'use strict';
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
    uri:'mongodb://localhost/dbAversiumSessions',
    collection: 'mySessions'
},
(error) => {
    
    if(error) trow(error);
    console.log('Successfully connected dbAversiumSessions');
});

module.exports = store