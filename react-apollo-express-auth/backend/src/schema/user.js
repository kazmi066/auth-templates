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
    messages: [Message!]
  }

  type Message{
    message: String!
  }
  
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
    logout: Message
  }
  
  type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Message!

    signIn(email: String!, password: String!): Token!
    updateUser(username: String!): User!
    deleteUser(id: ID!): Boolean!
  }

`;