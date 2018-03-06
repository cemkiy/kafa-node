

const express = require('express');
const graphqlHTTP = require('express-graphql');
const userSchema = require('./src/user/schema.js');
const torrentSchema = require('./src/torrent/schema.js');
const kafaSchema = require('./src/kafa/schema.js');
const tokenSchema = require('./src/token/schema.js');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./src/config');

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

app.use("/graphql/users", passport.authenticate('jwt', {
	session: false
}), graphqlHTTP(request => ({
	schema: userSchema,
	rootValue: request,
	graphiql: true,
})));

app.use('/graphql/torrents', passport.authenticate('jwt', {
	session: false
}), graphqlHTTP(request => ({
	schema: torrentSchema,
	rootValue: request,
	graphiql: true,
})));

app.use('/graphql/kafas', passport.authenticate('jwt', {
	session: false
}), graphqlHTTP(request => ({
	schema: kafaSchema,
	rootValue: request,
	graphiql: true,
})));

app.use('/graphql/token', graphqlHTTP({
	schema: tokenSchema,
	graphiql: true //set to false if you don't want graphiql enabled
}));

app.listen(port);
console.log('3..2..1... firing -> ' + port);
