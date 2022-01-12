const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    role: String
  }

  type Message {
    message: String!
  }
  
  type Query {
    # Users
    getUser(id: Int!): User
  }

  type Mutation {
    # Auth
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): String!
    logout: String!
  }
`;

module.exports = typeDefs;