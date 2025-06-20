var express = require('express');
const db = require('../db.js');
var router = express.Router();

/* GET home page. */
router.get('/dogs', async function(req, res, next) {
  try {
    var query = `SELECT name as dog_name, size, username as owner_username FROM Dogs
    INNER JOIN Users
    ON Dogs.owner_id = Users.user_id`;
    const [rows] = await db.query(query);
    return res.send(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.get('/walkrequests/open', async function(req,res,next) {
  try {
    var query = `SELECT request_id, d.name as dog_name, requested_time, duration_minutes, location, u.username as owner_username FROM WalkRequests wr
    INNER JOIN Dogs d on d.dog_id = wr.dog_id
    INNER JOIN Users u on u.user_id = d.owner_id`;
    const [rows] = await db.query(query);
    return res.send(rows);
  } catch (err) {
  console.log(err);
  return res.status(500).send();
  }
});

router.get('/walkers/summary', async function (req,res,next) {
  try {
    // Get all the walkers
    var query = "SELECT user_id, username, email FROM Users WHERE Role = 'walker'";
    var [walkers] = await db.query(query);
    // Get all reviews associated with each walker
    var fetchReviews = [];
    for (const walker of walkers) {
      fetchReviews.push(walker);
    }
    const walkerReviews = await Promise.all(fetchReviews);
    for (let w = 0; w < walkerReviews.length; w++) {
      for (let r = 0; r < walkerReviews[w].length; r++) {
        
      }
    }


  } catch (err) {
    console.log(err);
    return res.status(500).send;
  }
})
module.exports = router;
