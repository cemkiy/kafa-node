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
  query: UserQueryRootType
  // mutation: MutationRootType
});

module.exports = UserAppSchema;
