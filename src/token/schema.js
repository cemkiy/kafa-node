// Root schemas
const tokenQueryRoot = require('./queries.js');
const tokenMutationRoot = require('./mutations.js');

let {
	GraphQLObjectType,
	GraphQLSchema
} = require('graphql');

// This is the schema declaration
const TokenAppSchema = new GraphQLSchema({
	query: tokenQueryRoot,
	mutation: tokenMutationRoot
});

module.exports = TokenAppSchema;
