let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

// UserType for graphql
const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represent an user",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    username: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    birthday: {type: new GraphQLNonNull(GraphQLString)},
    kafas: status: { type: new GraphQLObjectType({
            name: 'KafaType',
            fields: () => ({
              torrent: {
                type: TorrentType,
                resolve: function(kafa) {
                  return  kafa.torrent;
                }
              },
              kafa_count:{type: new GraphQLNonNull(GraphQLInt)}
            })
        })
    },
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
    deleted_at: {type: new GraphQLNonNull(GraphQLString)}
  })
});
