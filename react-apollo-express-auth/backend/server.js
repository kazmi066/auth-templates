const express = require("express");
const cors = require("cors");
const _ = require('lodash');
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();
require("./connection");
const authResolver = require("./resolvers/authResolver");
const typedefs = require("./schema");

const PORT = process.env.PORT || 5000;

(async () => {
  const server = new ApolloServer({
    typeDefs: typedefs,
    resolvers: _.merge(
      authResolver
    ),
    context: ({ req, res }) => {
      const user = req.user || null;
      return {
        user
      };
    },
  });

  const app = express();

  // Middlewares
  app.use(express.json()); // bodyparser
  app.use(cors());

  // HTTP Routes
  app.use("/api/something", require("./routes/something.route"));

  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
})();

