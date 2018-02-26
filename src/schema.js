const _ = require('lodash');

// Schemas get data from JSON Arrays in the respective files.
const Torrents = require('./data/torrents');
const Users = require('./data/users');

let {
  // These are the basic GraphQL types need in this tutorial
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  // This is used to create required fileds and arguments
  GraphQLNonNull,
  // This is the class we need to create the schema
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

const StatusType = new GraphQLObjectType({
  name: "Status",
  description: "This represent a status",
  fields: () => ({
    leechers:{type: GraphQLInt},
    seeders:{type: GraphQLInt}
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
    user: {
      type: UserType,
      resolve: function(torrent) {
        return _.find(Users, u => u.id == torrent.user_id);
      }
    }
  })
});

// This is the Root Query
const TorrentQueryRootType = new GraphQLObjectType({
  name: 'TorrentAppSchema',
  description: "Torrent Schema Query Root",
  fields: () => ({
    torrents: {
      type: new GraphQLList(TorrentType),
      description: "List of all Torrents",
      resolve: function() {
        return Torrents
      }
    }
  })
});

// This is the schema declaration
const TorrentAppSchema = new GraphQLSchema({
  query: TorrentQueryRootType
  // If you need to create or updata a datasource,
  // you use mutations. Note:
  // mutations will not be explored in this post.
  // mutation: TorrentMutationRootType
});

module.exports = TorrentAppSchema;
