// Mongoose schemas
const TorrentModel = require('./models/torrent');

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

const KafaType = { type: new GraphQLObjectType({
        name: 'KafaType',
        description: "This represent a kafa",
        fields: () => ({
          torrent: {
            type: TorrentType,
            resolve: function(kafa) {
              return  TorrentModel.findById(kafa.torrent_id);
            }
          },
          kafa_count:{type: new GraphQLNonNull(GraphQLInt)}
        })
    })
}

// UserType for query
const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "This represent an user",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    username: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    birthday: {type: new GraphQLNonNull(GraphQLString)},
    kafas: { type: new GraphQLList(KafaType)},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
    deleted_at: {type: new GraphQLNonNull(GraphQLString)}
  })
});

// UserInputType for mutation
const UserInputType = new GraphQLObjectType({
  name: "UserInputType",
  description: "This represent an user",
  fields: () => ({
    username: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
    birthday: {type: new GraphQLNonNull(GraphQLString)}
  })
});
