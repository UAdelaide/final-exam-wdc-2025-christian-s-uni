const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all walk requests (for walkers to view)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT wr.*, d.name AS dog_name, d.size, u.username AS owner_name
      FROM WalkRequests wr
      JOIN Dogs d ON wr.dog_id = d.dog_id
      JOIN Users u ON d.owner_id = u.user_id
      WHERE wr.status = 'open'
    `);
    res.json(rows);
  } catch (error) {
    console.error('SQL Error:', error);
    res.status(500).json({ error: 'Failed to fetch walk requests' });
  }
});

// POST a new walk request (from owner)
router.post('/', async (req, res) => {
  const { dog_id, requested_time, duration_minutes, location } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location)
      VALUES (?, ?, ?, ?)
    `, [dog_id, requested_time, duration_minutes, location]);

    res.status(201).json({ message: 'Walk request created', request_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create walk request' });
  }
});

// POST an application to walk a dog (from walker)
router.post('/:id/apply', async (req, res) => {
  const requestId = req.params.id;
  const { walker_id } = req.body;

  try {
    await db.query(`
      INSERT INTO WalkApplications (request_id, walker_id)
      VALUES (?, ?)
    `, [requestId, walker_id]);

    await db.query(`
      UPDATE WalkRequests
      SET status = 'accepted'
      WHERE request_id = ?
    `, [requestId]);

    res.status(201).json({ message: 'Application submitted' });
  } catch (error) {
    console.error('SQL Error:', error);
    res.status(500).json({ error: 'Failed to apply for walk' });
  }
});

// Get all dogs from the signed in user
router.get('/userdogs', async (req,res) => {
  try {
  // db.query to SELECT * FROM Dogs WHERE owner_id = ...
  var query = "SELECT * FROM Dogs WHERE owner_id = ?";
  var [dogs] = await db.query(query, [req.session.user.user_id]);
  return res.send(dogs);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Error occurred while fetching your dogs, are you logged in?" });
  }
});

// Get all dogs in the database
router.get('/dogs', async function(req, res, next) {
  try {
    var query = `SELECT name as dog_name, size, owner_id, dog_id FROM Dogs
    INNER JOIN Users
    ON Dogs.owner_id = Users.user_id`;
    const [rows] = await db.query(query);
    return res.send(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
