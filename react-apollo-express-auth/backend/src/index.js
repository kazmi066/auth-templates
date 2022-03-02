import express from "express";
import cors from "cors";
import _ from "lodash";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import 'dotenv/config';
import jwt from "jsonwebtoken";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import models, {connectDB} from './models/index.js';
import schema from './schema/index.js';
import resolvers from "./resolvers/index.js";
import something from './routes/something.route.js';

const PORT = process.env.PORT || 5000;

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

(async () => {
  connectDB();
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req, res }) => {
      if(req) {
        const me = await getMe(req);
        return {
          models,
          me,
          req,
          res
        };
      }
      else{
        return {
          models,
          req,
          res
        };
      }
    },
  });

  const app = express();

  // Middlewares
  app.use(express.json()); // bodyparser
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));
  app.use(cookieParser({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: false,
  }));
  app.use(morgan("dev"));
  app.set('trust proxy', 1);

  // HTTP Routes
  app.use("/api/something", something);

  await server.start();
  server.applyMiddleware({ app, path: "/graphql", cors: false });

  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}`
    )
  );
})();

