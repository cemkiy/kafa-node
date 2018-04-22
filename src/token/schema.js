// Root schemas
const tokenMutationRoot = require('./mutations.js');

let {
	GraphQLSchema
} = require('graphql');

// This is the schema declaration
const TokenAppSchema = new GraphQLSchema({
	mutation: tokenMutationRoot
});

module.exports = TokenAppSchema;
