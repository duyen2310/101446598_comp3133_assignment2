const express = require('express');
//apollo
const { ApolloServer } = require('apollo-server-express');
//db
const connectDB = require('./config/db');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolver');
//auth
const authMiddleware = require('./middleware/auth');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true,
  }));
//connect db 
connectDB();

//apollo server with authentication
const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware });

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startServer();

module.exports = app;
