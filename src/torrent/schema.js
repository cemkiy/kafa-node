// roots schemas
const torrentQueryRoot = require('./queries.js');
const torrentMutationRoot = require('./mutations.js');

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
  query: torrentQueryRoot,
  mutation: torrentMutationRoot
});

module.exports = TorrentAppSchema;
