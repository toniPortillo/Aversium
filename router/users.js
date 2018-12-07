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


module.exports = router;
