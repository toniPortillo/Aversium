'use strict';

let express = require('express');
let router = express.Router();

let team_controllers = require('./controllers/teamController');

router.get('/', team_controllers.team_list_get);

router.get('/createTeam', team_controllers.team_create_get);
router.post('/createTeam', team_controllers.team_create_post);

router.get('/:nombre', team_controllers.team_modify_get);
router.post('/modifyTeam', team_controllers.team_modify_post);

module.exports = router;