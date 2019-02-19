'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dbAversium', function(err) {
    
    if(err) throw err;
    console.log('Successfully connected dbAversium');
});

module.exports = mongoose;