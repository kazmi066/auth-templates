import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
      <ApolloProvider client={client}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
