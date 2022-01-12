const resolvers = {
  Query: {
    getTodoList: async (_, args, context) =>
      await context.models.Todo.queries.getTodoList(),

    getUsers: async (_, args, context) =>
      await context.models.User.queries.getUsers(),

    loggedInUser: async (_, args, context) =>
      await context.models.User.queries.loggedInUser(),
  },
  Mutation: {
    addTodo: async (_, args, context) =>
      await context.models.Todo.mutations.addTodo(
        JSON.parse(JSON.stringify(args.todo))
      ),
    updateTodo: async (_, args, context) =>
      await context.models.Todo.mutations.updateTodo(
        JSON.parse(JSON.stringify(args))
      ),
    deleteTodo: async (_, args, context) =>
      await context.models.Todo.mutations.deleteTodo(
        JSON.parse(JSON.stringify(args.id))
      ),
    registerUser: async (_, args, context) =>
      await context.models.User.mutations.registerUser(
        JSON.parse(JSON.stringify(args.user))
      ),
    login: async (_, args, context) =>
      await context.models.User.mutations.login(
        JSON.parse(JSON.stringify(args.user))
      ),
  },
};

module.exports = resolvers;
