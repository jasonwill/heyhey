require('dotenv').config()
const pg = require('pg')
const express = require('express')
const { postgraphile } = require('postgraphile')
// const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter")
//const PassportLoginPlugin = require("./PassportLoginPlugin")
const session = require('express-session')
// const passport = require('passport')

const app = express()
const cors = require('cors');

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(
  postgraphile(
    pgPool,
    ['announcements'],
    // process.env.SCHEMA_NAMES ? process.env.SCHEMA_NAMES.split(',') : ['announcements'],
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