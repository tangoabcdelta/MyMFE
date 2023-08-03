const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    hello: String!
    id: String!
    register: RegisterResponse!
  }

  type ID {
    value: String!
  }
  type User {
    id: ID!
    username: String!
  }
  type Error {
    field: String!
    message: String!
  }
  type RegisterResponse {
    user: User
    errors: [Error]
  }
  type Mutation {
    register(username: String!, password: String!, age: Int): RegisterResponse!
  }
`;

const resolvers = {
  Query: {
    hello: () => "a5",
    id: () => "Bond007",
    register: () => ({
      errors: [
        {
          field: "test",
          message: "test error message",
        },
        {
          field: "test 2",
          message: "2nd test error message",
        },
        null,
      ],
      id: 1,
      username: "test name",
    }),
  },
  Mutation: {
    register: () => ({
      errors: [
        {
          field: "test",
          message: "test error message",
        },
        {
          field: "test 2",
          message: "2nd test error message",
        },
        null,
      ],
      id: 1,
      username: "test name",
    }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen({ port: 9005 })
  .then(({ url }) => console.log(`server started at ${url}`));
