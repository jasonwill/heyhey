require('dotenv').config()

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
var path = require('path');

const pg = require('pg')
const express = require('express')
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
app.use(passport.authenticate('session')); // TODO use this
// end see https://www.passportjs.org/tutorials/google/session

app.use('/', indexRouter);
app.use('/', authRouter);

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