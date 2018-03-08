// Root schemas
const tokenMutationRoot = require('./mutations.js');
const tokenQueryRoot = require('./queries.js');

let {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema
} = require('graphql');

// This is the schema declaration
const TokenAppSchema = new GraphQLSchema({
	query: tokenQueryRoot,
	mutation: tokenMutationRoot
});

module.exports = TokenAppSchema;
