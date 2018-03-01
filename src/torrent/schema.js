let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');


// This is the schema declaration
const TorrentAppSchema = new GraphQLSchema({
  query: TorrentQueryRootType,
  mutation: TorrentMutationRootType
});

module.exports = TorrentAppSchema;
