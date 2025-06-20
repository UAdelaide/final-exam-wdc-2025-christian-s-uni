var express = require('express');
const db = require('../db');
var router = express.Router();
db = require('../db.js');

/* GET home page. */
router.get('/dogs', function(req, res, next) {
  try {
    var query = "SELECT name as dog_name, size, username as owner_username FROM Dogs INNER JOIN Users on Dogs.owner_id = Users.user_id"
    const [rows] = db.query(query);
    
  }
});

module.exports = router;
