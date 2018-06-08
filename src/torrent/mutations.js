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
          .catch((err) => {
            throw err
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
        return torrentModel.update(query, args.input)
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
        return torrentModel.findOneAndRemove(query)
          .then(() => {
            return 'deleted'
          })
          .catch((err) => {
            throw err
          })
      }
    },
    incrementDownloadCount: {
      type: new GraphQLNonNull(torrentTypes.TorrentType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function (parent, args, rootValue) {
        let query = config.securityPointForChangeSource(rootValue, args.id, ['buccaneer', 'captain', 'privateer'])
        return torrentModel.incrementDownloadCount(query)
          .then((torrent) => {
            return torrent
          })
          .catch((err) => {
            throw err
          })
      }
    },
    addComment: {
      type: new GraphQLNonNull(torrentTypes.TorrentType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        input: {
          type: new GraphQLNonNull(torrentTypes.CommentInputType)
        }
      },
      resolve: function (parent, args, rootValue) {
        config.securityPointForCreateSource(rootValue, ['buccaneer', 'captain', 'privateer'])
        return torrentModel.addComment(args.id, rootValue.user._id, args.input.text)
          .then((torrent) => {
            return torrent
          })
          .catch((err) => {
            throw err
          })
      }
    },
    updateComment: {
      type: new GraphQLNonNull(torrentTypes.TorrentType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        input: {
          type: new GraphQLNonNull(torrentTypes.CommentInputType)
        }
      },
      resolve: function (parent, args, rootValue) {
        let query = config.securityPointForChangeSource(rootValue, args.id, ['source_owner', 'buccaneer', 'captain', 'privateer'])
        return torrentModel.updateComment(query, args.input.comment_id, args.input.text)
          .then((torrent) => {
            return torrent
          })
          .catch((err) => {
            throw err
          })
      }
    },
    deleteComment: {
      type: new GraphQLNonNull(torrentTypes.TorrentType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        input: {
          type: new GraphQLNonNull(torrentTypes.CommentInputType)
        }
      },
      resolve: function (parent, args, rootValue) {
        let query = config.securityPointForChangeSource(rootValue, args.id, ['source_owner', 'buccaneer', 'captain', 'privateer'])
        return torrentModel.removeComment(query, args.comment_id)
          .then((torrent) => {
            return torrent
          })
          .catch((err) => {
            throw err
          })
      }
    }
  })
})

module.exports = TorrentMutationRootType
