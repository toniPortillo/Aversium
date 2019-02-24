'use strict';
let express = require('express');
let team_controllers = require('./controllers/teamController');
let verifyUser = require('./middlewares/security/verifyUser');
let router = express.Router();

router.get('/', verifyUser, team_controllers.team_list_get);

router.get('/createTeam', verifyUser, team_controllers.team_create_get);
router.post('/createTeam', verifyUser, team_controllers.team_create_post);

router.get('/:nombre', verifyUser, team_controllers.team_show_get);

router.get('/modifyTeam/:nombre', verifyUser, team_controllers.team_modify_get);
router.post('/modifyTeam/:nombre', verifyUser, team_controllers.team_delete_post);

router.post('/addUser/:nombre', verifyUser, team_controllers.team_modify_addUser_post);
router.post('/deleteUser/:nombre', verifyUser, team_controllers.team_modify_deleteUser_post);
router.post('/membersNumber/:nombre', verifyUser, team_controllers.team_modify_membersNumber_post);

module.exports = router;