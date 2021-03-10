import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema, Query, Resolver } from "type-graphql";

@Resolver()
class HelloResolver {

  @Query(() => String, { description: "Returs a hello world message" })
  async hello() {
    return "Hello world, I'm Beto!"
  }
}

const main = async () => {

    const schema = await buildSchema({
        resolvers: [HelloResolver]
    });

    const apolloServer = new ApolloServer({schema});

    const server = await apolloServer.listen({ port: 5000 });
    console.log(`Server running at ${server.url}`);
};

main();