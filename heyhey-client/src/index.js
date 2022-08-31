import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
//import { WebSocketLink } from "@apollo/client/link/ws";

/*const httpLink = new HttpLink({
  uri: process.env[`REACT_APP_${process.env.NODE_ENV}_GRAPHQL_END_POINT_URI`],
});

const wsLink = new WebSocketLink({
  uri: process.env[`REACT_APP_${process.env.NODE_ENV}_GRAPHQL_WEB_SOCKET_URI`],
  options: {
    reconnect: true,
  },
});*/

const client = new ApolloClient({
  uri: 'http://localhost:5002/',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query GetAllAnnouncements {
        allAnnouncements{
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          nodes {
            id
            authorId
            title
            content
            createdAt
            userByAuthorId {
              username
              createdAt
            }
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));

ReactDOM.render(

  <React.StrictMode>

    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
