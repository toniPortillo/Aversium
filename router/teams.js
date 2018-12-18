'use strict';

let express = require('express');
let router = express.Router();

let team_controllers = require('./controllers/teamController');

router.get('/', team_controllers.team_list_get);

router.get('/createTeam', team_controllers.team_create_get);
router.post('/createTeam', team_controllers.team_create_post);

router.get('/:nombre', team_controllers.team_modify_get);

router.post('/addUser/:nombre', team_controllers.team_modify_addUser_post);
router.post('/deleteUser/:nombre', team_controllers.team_modify_deleteUser_post);
router.post('/membersNumber/:nombre', team_controllers.team_modify_membersNumber_post);


module.exports = router;