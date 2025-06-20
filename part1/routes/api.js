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
    INNER JOIN Users u on u.user_id = d.owner_id
    WHERE wr.status = 'open'`;
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
    var query = ` SELECT ratinginfo.username, total_ratings, average_rating, completed_walks FROM
    (SELECT username, COUNT(rating_id) AS total_ratings, AVG(rating) AS average_rating FROM Users u
LEFT JOIN WalkRatings wra ON u.user_id = wra.walker_id
WHERE u.role = "walker" GROUP BY username) AS ratinginfo
INNER JOIN (SELECT username, COUNT(wre.status) AS completed_walks FROM Users u
LEFT JOIN WalkApplications wa on wa.walker_id = u.user_id
LEFT JOIN WalkRequests wre ON wre.status = "completed" AND wre.request_id = wa.request_id
WHERE u.role = "walker"
GROUP BY username) AS numberofwalks
ON numberofwalks.username = ratinginfo.username;`;
    var [summary] = await db.query(query);
    return res.send(summary);
  } catch (err) {
    console.log(err);
    return res.status(500).send;
  }
})
module.exports = router;
