const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const mongoConnection = require("./db/connection/mongo");
const sqlConnection = require("./db/connection/sql");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const generateTodoModel = require("./schema/models/todoModel");
const expressJwt = require("express-jwt");
const dotenv = require("dotenv");
const generateUserModel = require("./schema/models/userModel");

dotenv.config();
const PORT = process.env.PORT || 5500;

(async function () {
  // MongoDB Connection
  // await mongoConnection()
  //   .then((result) => console.log(result))
  //   .catch((err) => console.log(err));

  // Creating apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      console.log("Created again");
      const user = req.user || null;
      return {
        user,
        models: {
          Todo: generateTodoModel({ user }),
          User: generateUserModel({ user }),
        },
      };
    },
  });

  const app = express();

  // Middlewares
  app.use(express.json()); // bodyparser
  app.use(cors());
  app.use(
    expressJwt({
      secret: process.env.JWT_SECRET,
      algorithms: ["HS256"],
      credentialsRequired: false,
    })
  );

  // Routes for SQL Queries
  app.use("/emails", require("./routes/notifier"));

  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
})();
