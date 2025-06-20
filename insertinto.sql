SOURCE dogwalks.sql

INSERT INTO Users(username, email, password_hash, role) VALUES
("alice123", "alice@example.com", "hashed123", 'owner'),
("bobwalker", "bob@example.com", "hashed456", 'walker'),
("carol123", "carol@example.com", "hashed789", 'owner'),
("ben", "ben@example.com", "verysecure", 'owner'),
("kenny06", "kenny@kennison.com", "evenmoresecure151", 'walker');


INSERT INTO Dogs(owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username = "alice123"), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = "carol123"), 'Bella', 'small'),
((SELECT user_id FROM Users WHERE username = "ben"), "Clifford", 'large'),
((SELECT user_id FROM Users WHERE username = "alice123"), 'Sam', 'small'),
((SELECT user_id FROM Users WHERE username = "carol123"), 'Lucy', 'large');

INSERT INTO WalkRequests(dog_id, requested_time, duration_minutes, location, status) VALUES
((SELECT dog_id FROM Dogs WHERE name = "Max"), '2025-06-10 08:00:00', 30, "Parklands", 'open'),
((SELECT dog_id FROM Dogs WHERE name = "Bella"), '2025-06-10 09:30:00', 45, "Beachside Ave", 'accepted'),
((SELECT dog_id FROM Dogs WHERE name = "Clifford"), '2025-06-13 10:30:00', 60, "Croydon", 'completed'),
((SELECT dog_id FROM Dogs WHERE name = "Sam"), '2025-06-13 11:30:00', 15, "Ru", 'accepted'),
((SELECT dog_id FROM Dogs WHERE name = "Lucy"), '2025-06-13 10:30:00', 30, "Croydon", 'open'),
;