import "dotenv/config";
import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express, { Request, Response } from "express";
import { buildSchema } from "type-graphql";
import { PORT } from "./constant";
import { AppDataSource } from "./data-source";
import { AuthResolver } from "./resolvers/AuthResolver";
import { HelloResolver } from "./resolvers/HelloResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { seedDb } from "./seed";

(async () => {
  try {
    const app = express();

    app.use(cors());
    app.use(express.json());

    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, AuthResolver, UserResolver],
      }),
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
    });

    await Promise.all([server.start(), AppDataSource.initialize()]);

    server.applyMiddleware({ app, cors: false });

    await seedDb();

    app.listen(PORT, () => {
      console.log(`App started @${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
