let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

// TorrentType for graphql
const TorrentType = new GraphQLObjectType({
  name: "Torrent",
  description: "This represent a torrent",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    name:{type: new GraphQLNonNull(GraphQLString)},
    user: {
      type: UserType,
      resolve: function(torrent) {
        return  torrent.user_id;
      }
    },
    description:{type: new GraphQLNonNull(GraphQLString)},
    size:{type: new GraphQLNonNull(GraphQLInt)},
    info_link:{type: new GraphQLNonNull(GraphQLString)},
    info_hash:{type: new GraphQLNonNull(GraphQLString)},
    status: { type: new GraphQLObjectType({
            name: 'StatusType',
            fields: () => ({
              leechers:{type: GraphQLInt},
              seeders:{type: GraphQLInt}
            })
        })
    },
    screens:{ type: new graphql.GraphQLList(GraphQLString)},
    comments:{ type: new GraphQLObjectType({
            name: 'CommentType',
            fields: () => ({
              user: {
                type: UserType,
                resolve: function(torrent) {
                  return  torrent.user_id;
                }
              },
              text:{ type: new GraphQLNonNull(GraphQLString)},
              subcomment: {
                type: CommentType,
                resolve: function(comment) {
                  return  comment.subcomment;
                }
              }
              created_at:{ type: new graphql.GraphQLList(GraphQLString)},
              updated_at:{ type: new graphql.GraphQLList(GraphQLString)},
              deleted_at:{ type: new graphql.GraphQLList(GraphQLString)}
            })
        })
    },
    tags:{ type: new GraphQLObjectType({
            name: 'TagType',
            fields: () => ({
              name:{ type: new GraphQLNonNull(GraphQLString)},
              categorie:{ type: new GraphQLNonNull(GraphQLString)}
            })
        })
    },
    languages:{ type: new GraphQLObjectType({
            name: 'LanguageType',
            fields: () => ({
              audios:{ type: new graphql.GraphQLList(GraphQLString)},
              subtitles:{ type: new graphql.GraphQLList(GraphQLString)}
            })
        })
    },
    kafa:new GraphQLNonNull(GraphQLInt)},
    created_at:{ type: new graphql.GraphQLList(GraphQLString)},
    updated_at:{ type: new graphql.GraphQLList(GraphQLString)},
    deleted_at:{ type: new graphql.GraphQLList(GraphQLString)}
  })
});
