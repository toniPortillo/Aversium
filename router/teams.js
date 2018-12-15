'use strict';

let express = require('express');
let router = express.Router();

let team_controllers = require('./controllers/teamController');

router.get('/', team_controllers.team_list_get);

router.get('/createTeam', team_controllers.team_create_get);
router.post('/createTeam', team_controllers.team_create_post);

router.get('/:nombre', team_controllers.team_modify_get);
router.post('/:nombre', team_controllers.team_modify_post);

router.get('/modifyuser/:nombre', team_controllers.team_modify_addUser_get);
router.post('/modifyuser/:nombre', team_controllers.team_modify_addUser_post);

//router.get('/modifyusers/:nombre',);
//router.post('/modifyusers/:nombre',);

module.exports = router;