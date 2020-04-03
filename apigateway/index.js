import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { HttpLink } from 'apollo-link-http';
import { introspectSchema, mergeSchemas } from 'graphql-tools';
import makeRemoteExecutableSchema from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import fetch from 'node-fetch';
import { setContext } from "apollo-link-context";
import bodyParser from 'body-parser';

import cors from 'cors';


console.log('bqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpdbqpd');

const HOST = '0.0.0.0';

const getRemoteSchema = async (uri) => {
    // Get the schema from a remote graphql endpoint.
    // Returns a promise.

    const link = new HttpLink({ uri: uri, fetch });

    const schema = await introspectSchema(link);

    return makeRemoteExecutableSchema({
        schema,
        link,
    });
};

const userServiceURI = 'http://user:5000/graphql'
const departmentServiceURI = 'http://department:5001/graphql'

const linkTypeDefs = `
 type Address {
    fName: String!
    lName: String!
    age: Int!
    address: String!
  }

  extend type User {
    department: Department
  }

  extend type Query {
    getAddress: Address
  }
`;

Promise.all([
    getRemoteSchema(userServiceURI),
    getRemoteSchema(departmentServiceURI),
    linkTypeDefs,
])
    .then(schemas => {
        const userSchema = schemas[0];
        const departmentSchema = schemas[1];
        return mergeSchemas({
            schemas,
            resolvers: {
                User: {
                    department: {
                        fragment: `... on User { depId }`,
                        resolve(user, args, context, info) {
                            return info.mergeInfo.delegateToSchema({
                                schema: departmentSchema,
                                operation: 'query',
                                fieldName: 'depById',
                                args: {
                                    depId: user.depId,
                                },
                                context,
                                info,
                            });
                        },
                    },
                },
                Query: {
                    getAddress: () => {
                        return { "fName": "tj", "lName": "lj", "age": 10, "address": "sdsd sdsdsd sdsdsd sdsd" }
                    }
                }
            },
        });
    })
    .then(schema => {
        const server = new ApolloServer({
            schema,
        });

        const app = express();
        app.use(bodyParser.json());
        app.use(cors());

        server.applyMiddleware({ app });
        app.listen({ port: 4000, host: HOST }, () =>
            console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
        );
    })
    .catch(error => {
        console.log(error.message);
        throw new Error("Internal Server Error");
    });