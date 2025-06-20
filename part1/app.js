var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2/promise');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let db;

// Connect to MySQL

(async () => {
    try {
    // Connect to the dogwalks database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'DogWalkService'
    });
    } catch (err) {

    }
})();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
