require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const path = require('path');

const pg = require('pg')
const session = require('express-session');
const passport = require('passport');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const { postgraphile } = require('postgraphile')
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter")
//const PassportLoginPlugin = require("./PassportLoginPlugin")
// const session = require('express-session')
// const passport = require('passport')

const SQLiteStore = require('connect-sqlite3')(session);

const app = express()
app.locals.pluralize = require('pluralize');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: "http://localhost:3000",  // for the react-client
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// see https://www.passportjs.org/tutorials/google/session
app.use(passport.authenticate('session')); // TODO use this, but right now we get an error when trying to hit the graphql server with this line
// end see https://www.passportjs.org/tutorials/google/session

app.use('/', indexRouter);
app.use('/', authRouter);

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

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})
app.use(
  postgraphile(
    pgPool,
    // ['announcements'],
    process.env.SCHEMA_NAMES ? process.env.SCHEMA_NAMES.split(',') : ['announcements'],
    {
      graphiql: true,
      enhanceGraphiql: true,
      dynamicJson: true,
      enableCors: true,
      allowExplain(req) {
        return true
      },
    }
  )
)
const port = process.env.PORT || 5002
app.listen(port)
console.log(`🚀 Server ready at http://[host]:${port}/graphql`)
console.log(`🚀 Graphiql UI ready at http://[host]:${port}/graphiql`)

module.exports = app