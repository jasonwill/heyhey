const waitOn = require('wait-on');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { introspectSchema, RenameTypes, RenameRootFields } = require('@graphql-tools/wrap');
const { stitchSchemas } = require('@graphql-tools/stitch');

const makeRemoteExecutor = require('./lib/make_remote_executor');

async function makeGatewaySchema() {
  const usersExec = makeRemoteExecutor('http://localhost:4001/graphql');
  const eventsExec = makeRemoteExecutor('http://localhost:4002/graphql');
  const announcementsExec = makeRemoteExecutor('http://localhost:5002/graphql');

  
  return stitchSchemas({
    subschemas: [
      {
        schema: await introspectSchema(usersExec),
        executor: usersExec,
      },
      {
        schema: await introspectSchema(eventsExec),
        executor: eventsExec,
      },
      {
        schema: await introspectSchema(announcementsExec),
        executor: announcementsExec,
      }
    ],
  });
}

waitOn({ resources: ['tcp:4001', 'tcp:4002'] }, async () => {
  const schema = await makeGatewaySchema();
  const app = express();
  app.use('/graphql', graphqlHTTP((req) => ({
    schema,
    graphiql: true
  })));
  app.listen(4000, () => console.log('gateway running at http://localhost:4000/graphql'));
});
