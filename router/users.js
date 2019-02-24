'use strict';
let express = require('express');
let user_controllers = require('./controllers/userController');
let verifyUser = require('./middlewares/security/verifyUser');
let router = express.Router();

router.get('/register', user_controllers.user_register_get);
router.post('/register', user_controllers.user_register_post);

router.get('/login', user_controllers.user_login_get);
router.post('/login', user_controllers.user_login_post);

router.get('/showuser', verifyUser, user_controllers.user_showuser_get);

router.get('/modify', verifyUser, user_controllers.user_modify_get);

router.post('/modifyrole', verifyUser, user_controllers.user_modifyrole_post);
router.post('/modifypassword', verifyUser, user_controllers.user_modifypassword_post);

router.get('/logout', verifyUser, user_controllers.user_logout);

module.exports = router;
