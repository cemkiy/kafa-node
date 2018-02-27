const _ = require('lodash');

// Schemas get data from JSON Arrays in the respective files.
const Torrents = require('./data/torrents');
const Users = require('./data/users');

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represent an user",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    username: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  })
});

const TorrentType = new GraphQLObjectType({
  name: "Torrent",
  description: "This represent a torrent",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    size: {type: GraphQLInt},
    status: {
      type: StatusType
    },
    status: { type: new GraphQLObjectType({
            name: 'StatusType',
            fields: () => ({
              leechers:{type: GraphQLInt},
              seeders:{type: GraphQLInt}
            })
        }),
    }
    user: {
      type: UserType,
      resolve: function(torrent) {
        return _.find(Users, u => u.id == torrent.user_id);
      }
    }
  })
});

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
      resolve: function() {
        return Users
      }
    }
  })
});

// This is the schema declaration
const AppSchema = new GraphQLSchema({
  query: QueryRootType
  // If you need to create or updata a datasource,
  // you use mutations. Note:
  // mutations will not be explored in this post.
  // mutation: TorrentMutationRootType
});

module.exports = AppSchema;
