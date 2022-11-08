const waitOn = require('wait-on');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { introspectSchema, RenameTypes, RenameRootFields } = require('@graphql-tools/wrap');
const { stitchSchemas } = require('@graphql-tools/stitch');

const makeRemoteExecutor = require('./lib/make_remote_executor');

async function makeGatewaySchema() {

  const usersRemoteQueryExec = makeRemoteExecutor('http://localhost:4001/graphql');
  const announcementsRemoteQueryExec = makeRemoteExecutor('http://localhost:5002/graphql');
  const eventsRemoteQueryExec = makeRemoteExecutor('http://localhost:4002/graphql');

  const usersSchema = await introspectSchema(usersRemoteQueryExec);
  const announcementsSchema = await introspectSchema(announcementsRemoteQueryExec);
  const eventsSchema = await introspectSchema(eventsRemoteQueryExec);

  return stitchSchemas({
    subschemas: [
      {
        schema: announcementsSchema,
        executor: announcementsRemoteQueryExec,
        merge: {
          User: {
            //Announcement.userByAuthorId
            fieldName: 'userByAuthorId',
            selectionSet: '{ id }',
            args: originalObject => ({ id: originalObject.id }),
          },
          Event: {
            fieldName: 'eventByEventId',
            selectionSet: '{ id }',
            // key: ({ id }) => id,
            args: originalObject => ({ id: originalObject.id }),
          },
          Announcement: {
            //Announcement.eventByEventId
            fieldName: 'announcementsByEventId',
            selectionSet: '{ id }',
            // key: ({ id }) => id,
            args: originalObject => ({ id: originalObject.id }),
          }
        }
      },
      {
        schema: eventsSchema,
        executor: eventsRemoteQueryExec,
        merge: {
          Event: {
            fieldName: 'eventById',
            selectionSet: '{ id }',
            args: originalObject => ({ id: originalObject.id }),
          },
        }
      },
      {
        schema: usersSchema,
        executor: usersRemoteQueryExec,
        merge: {
          User: {
            fieldName: 'userById',
            selectionSet: '{ id }',
            args: originalObject => ({ id: originalObject.id }),
          }
        }
      }
    ],
    mergeTypes: true // << default in v7
  });
}

waitOn({ resources: ['tcp:4001', 'tcp:4002', 'tcp:5002'] }, async () => {
  const schema = await makeGatewaySchema();
  // debugger;
  const app = express();
  app.use('/graphql', graphqlHTTP((req) => ({
    schema,
    graphiql: true
  })));
  app.listen(4000, () => console.log('gateway running at http://localhost:4000/graphql'));
});
