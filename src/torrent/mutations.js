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

// mutation {
//    createUser(input: {
//     email: "graphql@test.com"
//    }) {
//     id,
//     email
//   }
// }

// This is the Root Mutation
const TorrentMutationRootType = new GraphQLObjectType({
  name: 'TorrentAppSchema',
  description: "Torrent Schema Mutation Root",
  fields: () => ({
    createTorrent: {
    type: TorrentType,
    args: {
      input: {
        type: new GraphQLNonNull(TorrentInputType),
      },
    },
    resolve: async (rootValue, { input }) => {
      const result = await new Promise((resolve) => {
        setTimeout(() =>
          resolve(
            return torrentModel.create(input);
          ), 100);
      });
        return result;
        }
    },
    updateTorrent: {
    type: TorrentType,
    args: {
      input: {
        type: new GraphQLNonNull(TorrentInputType),
      },
    },
    resolve: async (rootValue, { input }) => {
      const result = await new Promise((resolve) => {
        setTimeout(() =>
          resolve(
            return torrentModel.create(input);
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
            return torrentModel.findByIdAndRemove(args.id, (err, torrent) => {
              if (err) return "failure";
              return "deleted"
          });
          ), 100);
      });
        return result;
        }
    }
  })
});
