// Mongoose schemas
const TorrentModel = require('./models/torrent');
const UserModel = require('./models/user');

// Graphql Types
const TorrentType = require('./types/torrent');
const UserType = require('./types/user');

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

// This is the Root Query
const QueryRootType = new GraphQLObjectType({
  name: 'AppSchema',
  description: "Torrent Schema Query Root",
  fields: () => ({
    torrents: {
      type: new GraphQLList(TorrentType),
      description: "List of all Torrents",
      resolve: function() {
        return Torrents
      }
    },
    users: {
      type: new GraphQLList(UserType),
      description: "List of all Users",
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function(parent, args, ast) {
        console.log(args);
        return User.find();
      }
    }
  })
});

// This is the schema declaration
const AppSchema = new GraphQLSchema({
  query: QueryRootType
  // mutation: MutationRootType
});

module.exports = AppSchema;
