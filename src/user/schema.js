// Root schemas
const userQueryRoot = require('./queries.js');
const userMutationRoot = require('./mutations.js');

let {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema
} = require('graphql');

// This is the schema declaration
const UserAppSchema = new GraphQLSchema({
	query: userQueryRoot,
	mutation: userMutationRoot
});

module.exports = UserAppSchema;
