// Config files
const config = require('../config/security.js')

// Mongoose schemas
const torrentModel = require('./models.js')

// Graphql Types
const torrentTypes = require('./types.js')

let {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql')

// This is the Root Mutation
const TorrentMutationRootType = new GraphQLObjectType({
  name: 'TorrentMutationSchema',
  description: 'Torrent Schema Mutation Root',
  fields: () => ({
    createTorrent: {
      type: new GraphQLNonNull(torrentTypes.TorrentType),
      args: {
        input: {
          type: new GraphQLNonNull(torrentTypes.TorrentCreateInputType)
        }
      },
      resolve: function (parent, {
        input
      }, rootValue) {
        config.securityPointForCreateSource(rootValue, ['captain', 'privateer'])
        return torrentModel.new(input)
          .then(function (torrent) {
            return torrent
          })
      }
    },
    updateTorrent: {
      type: new GraphQLNonNull(torrentTypes.TorrentType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        input: {
          type: new GraphQLNonNull(torrentTypes.TorrentUpdateInputType)
        }
      },
      resolve: function (parent, args, rootValue) {
        let query = config.securityPointForChangeSource(rootValue, args.id, ['source_owner', 'captain', 'privateer'])
        return torrentModel.findOneAndUpdate(query, {
          '$set': args.input
        }).exec()
          .then((torrent) => {
            return torrent
          })
          .catch((err) => {
            throw err
          })
      }
    },
    deleteTorrent: {
      type: GraphQLString,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function (parent, args, rootValue) {
        let query = config.securityPointForChangeSource(rootValue, args.id, ['source_owner', 'captain', 'privateer'])
        return torrentModel.findOneAndRemove(query).exec()
          .then(() => {
            return 'deleted'
          })
          .catch((err) => {
            throw err
          })
      }
    }
  })
})

module.exports = TorrentMutationRootType
