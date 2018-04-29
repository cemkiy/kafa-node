// Root schemas
const torrentQueryRoot = require('./queries.js')
const torrentMutationRoot = require('./mutations.js')

let {
  GraphQLSchema
} = require('graphql')

// This is the schema declaration
const TorrentAppSchema = new GraphQLSchema({
  query: torrentQueryRoot,
  mutation: torrentMutationRoot
})

module.exports = TorrentAppSchema
