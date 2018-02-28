const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema.js');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
// Connect to Database
mongoose.connect("mongodb://localhost:27017/kafa", {});

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + "mongodb://localhost:27017/kafa")
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err)
});

let port = 3000;
const app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true //set to false if you don't want graphiql enabled
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);
