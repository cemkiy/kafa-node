// Mongoose schemas
const torrentModel = require('./models.js');

// Graphql Types
const torrentTypes = require('./types.js');

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

// mutation {
//    createUser(input: {
//     email: "graphql@test.com"
//    }) {
//     id,
//     email
//   }
// }

// This is the Root Mutation
const TorrentMutationRootType = module.exports = new GraphQLObjectType({
  name: 'TorrentMutationSchema',
  description: "Torrent Schema Mutation Root",
  fields: () => ({
    createTorrent: {
    type: torrentTypes.TorrentType,
    args: {
      input: {
        type: new GraphQLNonNull(torrentTypes.TorrentInputType),
      },
    },
    resolve: async (rootValue, { input }) => {
      const result = await new Promise((resolve) => {
        setTimeout(() =>
          resolve(
            torrentModel.create(input, (err, torrent) => {
              if(err) throw err;
              return torrent;
            })
          ), 100);
      });
        return result;
        }
    },
    updateTorrent: {
    type: torrentTypes.TorrentType,
    args: {
      input: {
        type: new GraphQLNonNull(torrentTypes.TorrentInputType),
      },
    },
    resolve: async (rootValue, { input }) => {
      const result = await new Promise((resolve) => {
        setTimeout(() =>
          resolve(
            torrentModel.update(args.id, args.input, (err, updatedTorrent) => {
              if(err) throw err;
              return updatedTorrent;
            })
          ), 100);
      });
        return result;
        }
    },
    deleteTorrent: {
    type: GraphQLString,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      }
    },
    resolve: async (rootValue, args) => {
      const result = await new Promise((resolve) => {
        setTimeout(() =>
          resolve(
             torrentModel.findByIdAndRemove(args.id, (err, torrent) => {
              if (err) return "failure";
              return "deleted"
          })
          ), 100);
      });
        return result;
        }
    }
  })
});
