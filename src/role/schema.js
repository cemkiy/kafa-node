// Root schemas
const roleQueryRoot = require('./queries.js');
const roleMutationRoot = require('./mutations.js');

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

// This is the schema declaration
const RoleAppSchema = new GraphQLSchema({
  query: roleQueryRoot,
  mutation: roleMutationRoot
});

module.exports = RoleAppSchema;
