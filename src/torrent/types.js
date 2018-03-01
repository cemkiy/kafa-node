// Mongoose schemas
const UserModel = require('./models/user');

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

const CommentType = new GraphQLObjectType({
          name: 'CommentType',
          fields: () => ({
            user: {
              type: UserType,
              resolve: function(comment) {
                return  UserModel.findById(comment.user_id);
              }
            },
            text:{ type: new GraphQLNonNull(GraphQLString)},
            subcomments: { type: new graphql.GraphQLList(CommentType)},
            created_at:{ type: new graphql.GraphQLList(GraphQLString)},
            updated_at:{ type: new graphql.GraphQLList(GraphQLString)},
            deleted_at:{ type: new graphql.GraphQLList(GraphQLString)}
          })
  });

const TagType = new GraphQLObjectType({
          name: 'TagType',
          fields: () => ({
            name:{ type: new GraphQLNonNull(GraphQLString)},
            categories:{ type: new graphql.GraphQLList(GraphQLString)}
          })
  });

const LanguageType = new GraphQLObjectType({
          name: 'LanguageType',
          fields: () => ({
            audios:{ type: new graphql.GraphQLList(GraphQLString)},
            subtitles:{ type: new graphql.GraphQLList(GraphQLString)}
          })
  });

const StatusType = new GraphQLObjectType({
          name: 'StatusType',
          fields: () => ({
            leechers:{type: GraphQLInt},
            seeders:{type: GraphQLInt}
          })
  });


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
        return  UserModel.findById(torrent.user_id);
      }
    },
    description:{type: new GraphQLNonNull(GraphQLString)},
    size:{type: new GraphQLNonNull(GraphQLInt)},
    info_link:{type: new GraphQLNonNull(GraphQLString)},
    info_hash:{type: new GraphQLNonNull(GraphQLString)},
    status: {type: new GraphQLNonNull(StatusType)},
    screens:{ type: new graphql.GraphQLList(GraphQLString)},
    comments:{ type: new graphql.GraphQLList(CommentType)},
    tag:{ type: new GraphQLNonNull(TagType)},
    languages:{ type: new GraphQLNonNull(LanguageType)},
    kafa:new GraphQLNonNull(GraphQLInt)},
    created_at:{ type: new graphql.GraphQLNonNull(GraphQLString)},
    updated_at:{ type: new graphql.GraphQLNonNull(GraphQLString)},
    deleted_at:{ type: new graphql.GraphQLNonNull(GraphQLString)}
  })
});

// TorrentInputType for mutation
const TorrentInputType = new GraphQLObjectType({
  name: "TorrentInputType",
  description: "This represent an torrent",
  fields: () => ({
    name:{ type: new graphql.GraphQLNonNull(GraphQLString)},
    description:{ type: new graphql.GraphQLNonNull(GraphQLString)},
    size:{ type: new graphql.GraphQLNonNull(GraphQLInt)},
    info_link:{ type: new graphql.GraphQLNonNull(GraphQLString)},
    info_hash:{ type: new graphql.GraphQLNonNull(GraphQLString)},
    screens:{ type: new graphql.GraphQLList(GraphQLString)},
    tag:{ type: new graphql.GraphQLNonNull(TagType)},
    languages:{ type: new graphql.GraphQLNonNull(LanguageType)},
    status: {type: new GraphQLNonNull(StatusType)}
  })
});
