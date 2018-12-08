'use strict';

let express = require('express');
let router = express.Router();

//let team_controllers = require('./controllers/teamController');

router.get('/', function(req, res) {
    res.render('listTeams.ejs', {pruebesita: "De puta madre"});
});

router.get('/listaEquipos', function(req, res) {
    res.send('respond with a resource');
});

module.exports = router;