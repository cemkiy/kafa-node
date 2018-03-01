// Mongoose schemas
const userModel = require('../user/models.js');

// Graphql Types
const userTypes = require('../user/types.js');

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInputObjectType
} = require('graphql');

const CommentType = new GraphQLObjectType({
          name: 'CommentType',
          fields: () => ({
            user: {
              type: new GraphQLNonNull(userTypes.UserType),
              resolve: function(comment) {
                return  userModel.findById(comment.user_id);
              }
            },
            text:{ type: new GraphQLNonNull(GraphQLString)},
            subcomments: { type: new GraphQLList(CommentType)},
            created_at:{ type: new GraphQLList(GraphQLString)},
            updated_at:{ type: new GraphQLList(GraphQLString)},
            deleted_at:{ type: new GraphQLList(GraphQLString)}
          })
  });

const TagType = new GraphQLObjectType({
          name: 'TagType',
          fields: () => ({
            name:{ type: new GraphQLNonNull(GraphQLString)},
            categories:{ type: new GraphQLList(GraphQLString)}
          })
  });

const LanguageType = new GraphQLObjectType({
          name: 'LanguageType',
          fields: () => ({
            audios:{ type: new GraphQLList(GraphQLString)},
            subtitles:{ type: new GraphQLList(GraphQLString)}
          })
  });

const StatusType = new GraphQLObjectType({
          name: 'StatusType',
          fields: () => ({
            leechers:{type: GraphQLInt},
            seeders:{type: GraphQLInt}
          })
  });

  const TagInputType = new GraphQLInputObjectType({
            name: 'TagInputType',
            fields: () => ({
              name:{ type: new GraphQLNonNull(GraphQLString)},
              categories:{ type: new GraphQLList(GraphQLString)}
            })
    });

  const LanguageInputType = new GraphQLInputObjectType({
            name: 'LanguageInputType',
            fields: () => ({
              audios:{ type: new GraphQLList(GraphQLString)},
              subtitles:{ type: new GraphQLList(GraphQLString)}
            })
    });

  const StatusInputType = new GraphQLInputObjectType({
            name: 'StatusInputType',
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
      type: new GraphQLNonNull(userTypes.UserType),
      resolve: function(torrent) {
        return  userModel.findById(torrent.user_id);
      }
    },
    description:{type: new GraphQLNonNull(GraphQLString)},
    size:{type: new GraphQLNonNull(GraphQLInt)},
    info_link:{type: new GraphQLNonNull(GraphQLString)},
    info_hash:{type: new GraphQLNonNull(GraphQLString)},
    status: {type: new GraphQLNonNull(StatusType)},
    screens:{ type: new GraphQLList(GraphQLString)},
    comments:{ type: new GraphQLList(CommentType)},
    tag:{ type: new GraphQLNonNull(TagType)},
    languages:{ type: new GraphQLNonNull(LanguageType)},
    kafa:{type: new GraphQLNonNull(GraphQLInt)},
    created_at:{ type: new GraphQLNonNull(GraphQLString)},
    updated_at:{ type: new GraphQLNonNull(GraphQLString)},
    deleted_at:{ type: new GraphQLNonNull(GraphQLString)}
  })
});

// TorrentInputType for mutation
const TorrentInputType = new GraphQLInputObjectType({
  name: "TorrentInputType",
  description: "This represent an torrent",
  fields: () => ({
    name:{ type: new GraphQLNonNull(GraphQLString)},
    description:{ type: new GraphQLNonNull(GraphQLString)},
    size:{ type: new GraphQLNonNull(GraphQLInt)},
    info_link:{ type: new GraphQLNonNull(GraphQLString)},
    info_hash:{ type: new GraphQLNonNull(GraphQLString)},
    screens:{ type: new GraphQLList(GraphQLString)},
    tag:{ type: new GraphQLNonNull(TagInputType)},
    languages:{ type: new GraphQLNonNull(LanguageInputType)},
    status: {type: new GraphQLNonNull(StatusInputType)}
  })
});

module.exports = {
  CommentType,
  TagType,
  LanguageType,
  StatusType,
  TorrentType,
  TorrentInputType
}
