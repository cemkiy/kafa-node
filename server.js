

const express = require('express');
const graphqlHTTP = require('express-graphql');
const userSchema = require('./src/user/schema.js');
const torrentSchema = require('./src/torrent/schema.js');
const kafaSchema = require('./src/kafa/schema.js');
const tokenSchema = require('./src/token/schema.js');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./src/config');
const cors = require('cors');

mongoose.Promise = global.Promise;
// Connect to Database
mongoose.connect(config.DATABASE_URL, {});

// On Connection
mongoose.connection.on('connected', () => {
	console.log('Connected to database ' + config.DATABASE_URL)
});

// On Error
mongoose.connection.on('error', (err) => {
	console.log('Database error: ' + err)
});

let port = config.PORT;
const app = express();

// Passport Mİddleware
app.use(passport.initialize());
app.use(passport.session());

require('./src/config/passport')(passport);

app.use("/graphql/users", cors(), passport.authenticate('jwt', {
	session: false
}), graphqlHTTP(request => ({
	schema: userSchema,
	rootValue: request,
	graphiql: true,
})));

app.use('/graphql/torrents', cors(), passport.authenticate('jwt', {
	session: false
}), graphqlHTTP(request => ({
	schema: torrentSchema,
	rootValue: request,
	graphiql: true,
})));

app.use('/graphql/kafas', cors(), passport.authenticate('jwt', {
	session: false
}), graphqlHTTP(request => ({
	schema: kafaSchema,
	rootValue: request,
	graphiql: true,
})));

app.use('/graphql/roles', cors(), passport.authenticate('jwt', {
	session: false
}), graphqlHTTP(request => ({
	schema: roleSchema,
	rootValue: request,
	graphiql: true,
})));

app.use('/graphql/token', cors(), graphqlHTTP({
	schema: tokenSchema,
	graphiql: true
}));

app.listen(port);
console.log('All hand hoay! -> ' + port);
