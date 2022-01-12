const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Todo {
    _id: ID
    title: String
    description: String
    createdAt: String
    updatedAt: String
    isDone: Boolean
    owner_id: ID
  }

  input TodoInput {
    title: String
    description: String
    isDone: Boolean
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
  }

  input UserInput {
    username: String
    email: String
    password: String
    role: String
  }

  input LoginInput {
    username: String
    password: String
  }

  type Query {
    getTodoList: [Todo]
    getUsers: [User]
    loggedInUser: User
  }

  type Mutation {
    addTodo(todo: TodoInput): Todo
    deleteTodo(id: ID!): Todo
    updateTodo(id: ID!, query: TodoInput): Todo
    registerUser(user: UserInput): String
    login(user: LoginInput): String
  }
`;

module.exports = typeDefs;
