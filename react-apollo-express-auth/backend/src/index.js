import express from "express";
import cors from "cors";
import _ from "lodash";
import { ApolloServer } from "apollo-server-express";
import 'dotenv/config';
import morgan from "morgan";
import models, {connectDB} from './models/index.js';
import schema from './schema/index.js';
import resolvers from "./resolvers/index.js";
import something from './routes/something.route.js';

const PORT = process.env.PORT || 5000;

(async () => {
  connectDB();
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req, res }) => {
      const user = req.user || null;
      return {
        models,
        user
      };
    },
  });

  const app = express();

  // Middlewares
  app.use(express.json()); // bodyparser
  app.use(cors());
  app.use(morgan("dev"));

  // HTTP Routes
  app.use("/api/something", something);

  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}`
    )
  );
})();

