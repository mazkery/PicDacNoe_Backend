const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const passport = require('./src/services/user/auth/passport');
const verifyToken = require('./src/services/user/auth/verifyToken');
const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const adminRouter = require('./src/routes/admin');
const gameMatchRouter = require('./src/routes/game-match');
const emailRouter = require('./src/routes/email');

const app = express();

app.use(logger('dev'));
app.use(
	cors({
		origin: process.env.LOCAL_CLIENT_URL, // allow to server to accept request from different origin
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true, // allow session cookie from browser to pass through
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', verifyToken.authorizeAdmin, adminRouter);
app.use('/game-match', gameMatchRouter);
app.use('/email', emailRouter);

// connect to MongoDB database
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully.');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;
