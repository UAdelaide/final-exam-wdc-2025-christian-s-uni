var express = require('express');
var router = express.Router();
db = require('../db.js');

/* GET home page. */
router.get('/dogs', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
