import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  request: operation => {
    operation.setContext({
        credentials: 'include',
    });
  },
  response: operation => {
    const token = operation.getContext().token;
    if (token) {
      localStorage.setItem('token', token);
    }
  }
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
