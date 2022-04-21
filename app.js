var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const flash = require('express-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const auth = require('./routes/auth')
var app = express();
const restrict = require('./middlewares/restrict')

app.use(express.static('public/stylesheets'))
app.use(express.static('public/images'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
  secret: 'Buat ini jadi rahasia',
  resave: false,
  saveUninitialized: false,
  })
);

const passport = require('./lib/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', indexRouter);
app.use('/users', restrict, usersRouter);
app.use(auth);

app.get('/home', (req,res) => {
  res.render('home')
});

app.get('/register', (req,res) => {
  res.render('register')
});

app.get('/login', (req, res) => {
  res.render('login')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
