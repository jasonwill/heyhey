const pg = require('pg')
const express = require('express')
const { postgraphile } = require('postgraphile')
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const { default: FederationPlugin } = require("@graphile/federation");

require('dotenv').config()
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
    process.env.SCHEMA_NAMES ? process.env.SCHEMA_NAMES.split(',') : ['users'],
    {
      appendPlugins: [ConnectionFilterPlugin, FederationPlugin],
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
const port = process.env.PORT || 4001
app.listen(port)
console.log(`🚀 Server ready at http://[host]:${port}/graphql`)
console.log(`🚀 Graphiql UI ready at http://[host]:${port}/graphiql`)