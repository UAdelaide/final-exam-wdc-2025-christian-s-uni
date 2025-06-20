var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Connect to MySQL

(async () => {
    try {
        // Check there are no users and dogs in the database
        var [rows] = await db.query(`SELECT COUNT(*) as count FROM Users u
            INNER JOIN Dogs d on d.owner_id = u.user_id`);
        if (rows[0].count === 0) {
            // Add all the test data
            await db.execute(`
            INSERT INTO Users(username, email, password_hash, role) VALUES
            ("alice123", "alice@example.com", "hashed123", 'owner'),
            ("bobwalker", "bob@example.com", "hashed456", 'walker'),
            ("carol123", "carol@example.com", "hashed789", 'owner'),
            ("ben", "ben@example.com", "verysecure", 'owner'),
            ("kenny06", "kenny@kennison.com", "evenmoresecure151", 'walker');
            `);
            console.log("Successfully added users");

            await db.execute(`INSERT INTO Dogs(owner_id, name, size) VALUES
            ((SELECT user_id FROM Users WHERE username = "alice123"), 'Max', 'medium'),
            ((SELECT user_id FROM Users WHERE username = "carol123"), 'Bella', 'small'),
            ((SELECT user_id FROM Users WHERE username = "ben"), "Clifford", 'large'),
            ((SELECT user_id FROM Users WHERE username = "alice123"), 'Sam', 'small'),
            ((SELECT user_id FROM Users WHERE username = "carol123"), 'Lucy', 'large');`);
            console.log("Successfully added dogs");

            await db.execute(`INSERT INTO WalkRequests(dog_id, requested_time, duration_minutes, location, status) VALUES
            ((SELECT dog_id FROM Dogs WHERE name = "Max"), '2025-06-10 08:00:00', 30, "Parklands", 'open'),
            ((SELECT dog_id FROM Dogs WHERE name = "Bella"), '2025-06-10 09:30:00', 45, "Beachside Ave", 'accepted'),
            ((SELECT dog_id FROM Dogs WHERE name = "Clifford"), '2025-06-13 10:30:00', 60, "Croydon", 'completed'),
            ((SELECT dog_id FROM Dogs WHERE name = "Sam"), '2025-06-13 11:30:00', 15, "Rundle Mall", 'accepted'),
            ((SELECT dog_id FROM Dogs WHERE name = "Lucy"), '2025-06-13 9:30:00', 30, "Semaphore", 'completed');`);
            console.log('Successfully added walk requests');

            await db.execute(`INSERT INTO WalkRatings(request_id, walker_id, owner_id, rating, rated_at) VALUES
            (3, 2, 4, 5, '2025-06-13 12:00:00'),
            (5, 2, 3, 3, '2025-06-13 11:00:00');`);
            console.log('Successfully added walk ratings');

            await db.execute(`INSERT INTO WalkApplications(request_id, walker_id, applied_at, status)
                (1, 2, '2025-06-09 12:00:00', 'rejected'),
                (2, 5, '2025-06-09 15:40:32', 'accepted'),
                (3, 2, '2025-06-10 08:00:00', 'accepted'),
                (4, 5, '2025-06-12 10:00:00', )
                `)
        } else {
            console.log("Not adding data as there is already at least one user or dog");
        }
    } catch (err) {
    console.log('Error occurred while adding data.\n' + err);
    }
})();

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

module.exports = app;
