// Importaciones
const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");

// Accediendo a las variables de nuestro config/.env
require("dotenv").config({ path: "./config/.env" });

// Conectando con Base de Datos
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    // Para Mongoose mayor a v6 no son necesarios
    // useCreateIndex: true,
    // useFindAndModify: false,
  },
  (err, _) => {
    if (err) {
      console.log("Error de Conexión con MongoDB");
    } else {
      console.log("\x1b[33m");
      console.log("#######################################################");
      console.log("\x1b[32m");
      server();
    }
  }
);

// // Servidor de ApolloServer
async function server() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization;

      if (token) {
        try {
          const user = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.JWT_SECRET
          );

          return {
            user,
          };
        } catch (error) {
          console.log("### ERROR ###");
          console.log(error);
          throw new Error("Token Invalido");
        }
      }
    },
  });

  await serverApollo.start();

  const app = express();

  app.use(graphqlUploadExpress());

  serverApollo.applyMiddleware({ app });

  await new Promise((r) => app.listen({ port: process.env.PORT || 4000 }, r));
  console.log(
    `🚀 Servidor listo en: http://localhost:4000${serverApollo.graphqlPath}`
  );
  console.log("\x1b[33m");
  console.log("#######################################################");
  console.log("\x1b[0m");
}
