const pg = require('pg')
const express = require('express')
const { postgraphile } = require('postgraphile')
require('dotenv').config()
const app = express()

console.log(process.env.POSTGRES_DB)
console.log(process.env.POSTGRES_USER)
const pgPool = new pg.Pool({
  connectionString: (process.env.DATABASE_URL || 'postgres://jredcedar@localhost:5432/sayso_development'),
})

app.use(
  postgraphile(
    pgPool,
    process.env.SCHEMA_NAMES ? process.env.SCHEMA_NAMES.split(',') : ['public'],
    {
      watchPg: true,
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