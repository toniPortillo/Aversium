'use strict';

let express = require('express');
let router = express.Router();

let user_controllers = require('./controllers/userController.js');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


router.get('/register', user_controllers.user_register_get);
router.post('/register', user_controllers.user_register_post);

router.get('/login', user_controllers.user_login_get);
router.post('/login', user_controllers.user_login_post);

router.get('/showuser/:email', user_controllers.user_showuser_get);

router.get('/modify/:email', user_controllers.user_modify_get);

router.post('/modifyrole/:email', user_controllers.user_modifyrole_post);
router.post('/modifypassword/:email', user_controllers.user_modifypassword_post);

module.exports = router;
