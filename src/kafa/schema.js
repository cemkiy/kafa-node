// Root schemas
const kafaQueryRoot = require('./queries.js');
const kafaMutationRoot = require('./mutations.js');

let {
  GraphQLSchema
} = require('graphql');

// This is the schema declaration
const KafaAppSchema = new GraphQLSchema({
  query: kafaQueryRoot,
  mutation: kafaMutationRoot
});

module.exports = KafaAppSchema;
