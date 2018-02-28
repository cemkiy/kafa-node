// Mongoose schemas
const torrentModel = require('./torrent/model.js');
const userModel = require('./user/model.js');

// Graphql Types
const torrentType = require('./torrent/type.js');
const userType = require('./user/type.js');

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

// This is the Root Query
const TorrentQueryRootType = new GraphQLObjectType({
  name: 'TorrentAppSchema',
  description: "Torrent Schema Query Root",
  fields: () => ({
    torrents: {
      type: new GraphQLList(torrentType),
      description: "List of all Torrents",
      args: {
        name: {
          name: 'name',
          type: new GraphQLNonNull(GraphQLString)
        },
        user_id: {
          name: 'user_id',
          type: new GraphQLNonNull(GraphQLString)
        },
        info_link: {
          name: 'info_link',
          type: new GraphQLNonNull(GraphQLString)
        },
        info_hash: {
          name: 'info_hash',
          type: new GraphQLNonNull(GraphQLString)
        },
        tag: {
          name: 'tag',
          type: new GraphQLNonNull(GraphQLString)
        },
        categories: {
          name: 'categories',
          type: new GraphQLList(GraphQLString)
        },
        audios: {
          name: 'audios',
          type: new GraphQLList(GraphQLString)
        },
        subtitles: {
          name: 'subtitles',
          type: new GraphQLList(GraphQLString)
        },
        kafa_from: {
          name: 'kafa_from',
          type: new GraphQLNonNull(GraphQLInt)
        },
        kafa_to: {
          name: 'kafa_to',
          type: new GraphQLNonNull(GraphQLInt)
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
        torrentModel.list(args, (err, torrents) => {
          if (err)
            throw err;
          return torrents;
        });
      }
    }
  })
});
