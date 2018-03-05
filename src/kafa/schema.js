// roots schemas
const kafaQueryRoot = require('./queries.js');
const kafaMutationRoot = require('./mutations.js');

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
  query: kafaQueryRoot,
  mutation: kafaMutationRoot
});

module.exports = KafaAppSchema;
