import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Preloads config before other imports to ensure env variables are available asap
dotenv.config();

import { UserQueryResolvers } from "./graphql/resolvers/user/queries/UserQueryResolvers";
import { UserMutationResolvers } from "./graphql/resolvers/user/mutations/UserMutationResolvers";
import { ApiConstants } from "./api.constants";

const main = async () => {
    try {
        const MONGO_DB = process.env.MONGO_DB || ApiConstants.DEFAULT_MONGODB;
        await mongoose.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

        const schema = await buildSchema({
            resolvers: [UserQueryResolvers, UserMutationResolvers]
        });

        const apolloServer = new ApolloServer({ schema });

        const server = await apolloServer.listen({ port: process.env.API_PORT || ApiConstants.DEFAULT_API_PORT });
        console.log(`Server running at ${server.url}`);
    }
    catch(err) {
        console.error("Error initializing server: ", err);
    }
};

main();