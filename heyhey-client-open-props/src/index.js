import React from "react"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import * as ReactDOM from 'react-dom/client'
//import { WebSocketLink } from "@apollo/client/link/ws"

/*const httpLink = new HttpLink({
  uri: process.env[`REACT_APP_${process.env.NODE_ENV}_GRAPHQL_END_POINT_URI`],
})

const wsLink = new WebSocketLink({
  uri: process.env[`REACT_APP_${process.env.NODE_ENV}_GRAPHQL_WEB_SOCKET_URI`],
  options: {
    reconnect: true,
  },
})*/

const client = new ApolloClient({
  uri: 'http://localhost:5002/graphql',
  cache: new InMemoryCache()
})


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()