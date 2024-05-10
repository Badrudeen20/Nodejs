const express = require("express");
const { ApolloServer,gql  } = require("apollo-server");
// const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()
app.use(bodyParser.json());
app.use(cors());
const { TODOS } = require("./todo");

const server = new ApolloServer({
      typeDefs:  gql`

      type Todo {
            id:ID!
            title:String!
            completed:Boolean
      }

      type Query {
        greeting: String
        getTodo: [Todo]
      }

     
    `,
      resolvers: {
            Query: {
              greeting: () => 'Hello GraphQL world!👋',
              getTodo:()=>TODOS
            },
            
          },
});
server.listen({port:9000})
.then(serverInfo => console.log(`Server running at ${serverInfo.url}`));;
// app.use("/graphql", expressMiddleware(server));

// app.listen(8000, () => console.log("Serevr Started at PORT 8000"));