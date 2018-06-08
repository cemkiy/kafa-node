// Config files
const config = require('../config/security.js')

// Mongoose schemas
const kafaModel = require('./models.js')

// Graphql Types
const kafaTypes = require('./types.js')

let {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql')

// This is the Root Mutation
const KafaMutationRootType = new GraphQLObjectType({
  name: 'KafaMutationAppSchema',
  description: 'Kafa Schema Mutation Root',
  fields: () => ({
    incrementKafa: {
      type: new GraphQLNonNull(kafaTypes.KafaType),
      args: {
        input: {
          type: new GraphQLNonNull(kafaTypes.KafaIncrementInputType)
        }
      },
      resolve: function (parent, { input }, rootValue) {
        config.securityPointForCreateSource(rootValue, ['captain', 'buccaneer', 'privateer'])
        return kafaModel.incrementKafaCount(rootValue.user._id, input.torrent_id)
          .then((kafa) => {
            return kafa
          })
          .catch((err) => {
            throw err
          })
      }
    },
    updateKafa: {
      type: new GraphQLNonNull(kafaTypes.KafaType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        input: {
          type: new GraphQLNonNull(kafaTypes.KafaUpdateInputType)
        }
      },
      resolve: function (parent, args, rootValue) {
        let query = config.securityPointForChangeSource(rootValue, args.id, ['source_owner', 'captain', 'buccaneer', 'privateer'])
        return kafaModel.update(query, args.input)
          .then((kafa) => {
            return kafa
          })
          .catch((err) => {
            throw err
          })
      }
    },
    deleteKafa: {
      type: GraphQLString,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function (parent, args, rootValue) {
        let query = config.securityPointForChangeSource(rootValue, args.id, ['source_owner', 'captain', 'buccaneer', 'privateer'])
        return kafaModel.findBAndRemove(query)
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

module.exports = KafaMutationRootType
