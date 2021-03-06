import { gql } from 'apollo-server-express';

export default gql `
  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: String
  }

  type Message{
    message: String!
  }
  
  type Query {
    getUsers: [User]
    user(id: ID!): User
    me: User
  }
  
  type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Message!

    signIn(email: String!, password: String!): Token!
    updateUser(username: String, password: String): User!
    deleteUser(id: ID!): Boolean!
    logout: Message
  }

`;