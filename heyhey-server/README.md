# HeyHey-Server is an Announcment GraphQL Server

Running in development: `node server.js`

Default endpoint: `http://localhost:5002`

Deafault database: sayso_development

Default schema (for now, should be changed): public

The .env file contains the connection information for the datbase in the DATABASE_URL variable.  Example: 

```DATABASE_URL='postgres://api_user:api_password@localhost:5432/sayso_development'```

## Tools and Libraries Used

[node.js](https://nodejs.org/en/) Javascript Runtime

[Expressjs](https://expressjs.com/) Minimal Web Framework

[Postgraphile](https://www.graphile.org/postgraphile/) is used to create the basic API.  Postgraphile allows for much more than creating a simple API using introspection of the database, though that is a primary strength.  Postgraphile takes advantage of the strengths of Postgres.  Postgraphile executes extremely fast queries.

[Postgraphile Plugins](https://www.graphile.org/postgraphile/extending/)  Currently the connection-filter plugin is used, but others will almost certainly be used in the future, see package.json for the plugins that are installed.

[Postgresql](https://www.postgresql.org/) The prefrerred database, standards compliant, open source, capable, runs on virtually every cloud platform, and runs extremely well on AWS.


### Candidate Future Tools and Libraries

#### Database Migration and Mantenance

[umzug](https://www.npmjs.com/package/umzug)

[db-migrate](https://www.npmjs.com/package/db-migrate)

[flyway wrapper](https://www.npmjs.com/package/node-flywaydb)

[node-pg-migrate](https://www.npmjs.com/package/node-pg-migrate)

#### GraphQL Features

[ApolloServer](https://www.apollographql.com/docs/apollo-server/)  Provides additional features that may be useful, be careful of lock in on the Apollo tools, all good now, but the direction of Apollo is concerning


#### Federation

[Graphql Mesh](https://www.the-guild.dev/graphql/mesh) Currently looks like the best choice, especially considering the lockin to a cloud service does not exist

[Apollo Federation](https://www.apollographql.com/docs/federation/)

[StepZen](https://stepzen.com/)

#### Postgresql Extensions and Tools

[pg-wordvecs](https://github.com/stettix/pg-wordvecs) for NLP text searches, used the [Stanford GLoVe](https://nlp.stanford.edu/projects/glove/) dataset and Embeddings approach

#### Other

[The Guild Tools](https://the-guild.dev/)

[Hasura](https://hasura.com/) Option for Postgrapile, would required significant code changes, but we are not locked into a fundamental tool, Hasura has a bit more lockin than Postgraphile

[DGraph](https://dgraph.com/) Graph database, Supports GraphQL natively, scales well

[Neo4j](https://neo4j.com) Now supports GraphQL natively.  Very widely used.  Can be clustered, but does not scale as easily as other graph databases like [JanusGraph](https://janusgraph.org/).

[Milvus](https://milvus.io/) For NLP based searching, e.g. using embedding.  Likely not needed for quite a while

## Note on TypeScript vs JavaScript

Either works, even Flow would work, there are no constraints.  JS is used for now.

