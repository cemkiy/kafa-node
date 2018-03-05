// Mongoose schemas
const torrentModel = require('../torrent/models.js');
const userModel = require('./users/models.js');
const kafaModel = require('./models.js');

// Graphql Types
const torrentTypes = require('../torrent/types.js');
const userTypes = require('./user/types.js');
const kafaTypes = require('./types.js');

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');


// This is the Root Query
const KafaQueryRootType = module.exports = new GraphQLObjectType({
  name: 'KafaQuerySchema',
  description: "Kafa Schema Query Root",
  fields: () => ({
    kafas: {
      type: new GraphQLList(kafaTypes.KafaType),
      description: "List of all Kafas",
      args: {
        user_id: {
          name: 'user_id',
          type: new GraphQLNonNull(GraphQLString)
        },
        torrent_id: {
          name: 'torrent_id',
          type: new GraphQLNonNull(GraphQLString)
        },
        created_at_from: {
          name: 'created_at_from',
          type: new GraphQLNonNull(GraphQLString)
        },
        created_at_to: {
          name: 'created_at_to',
          type: new GraphQLNonNull(GraphQLString)
        },
        updated_at_from: {
          name: 'updated_at_from',
          type: new GraphQLNonNull(GraphQLString)
        },
        updated_at_to: {
          name: 'updated_at_to',
          type: new GraphQLNonNull(GraphQLString)
        },
        limit: {
          name: 'limit',
          type: new GraphQLNonNull(GraphQLInt)
        },
        skip: {
          name: 'skip',
          type: new GraphQLNonNull(GraphQLInt)
        },
        sort_field: {
          name: 'sort_field',
          type: new GraphQLNonNull(GraphQLString)
        },
        sort_type: {
          name: 'sort_type',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: function(parent, args, ast) {
        kafaModel.list(args, (err, kafas) => {
          if (err)
            throw err;
          return kafas;
        });
      }
    },
    kafaById: {
      type: new GraphQLNonNull(kafaTypes.KafaType),
      description: "Get kafa by id",
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function(parent, args, ast) {
        return kafaModel.findById(args.id);
      }
    }
  })
});
