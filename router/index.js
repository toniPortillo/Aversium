var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  req.session.user_id == undefined ? res.render('index', {
    title: 'Aversium',
    operation: ''
  }) : res.redirect('/users/showuser');
});

module.exports = router;
