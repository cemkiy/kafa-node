
// Mongoose schemas
const userModel = require('../user/models.js')
const kafaModel = require('../kafa/models.js')

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require('graphql')

const UserType = new GraphQLObjectType({
  name: 'torrentUserType',
  description: 'This represent an user',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    about: {
      type: GraphQLString
    },
    birthday: {
      type: new GraphQLNonNull(GraphQLString)
    },
    created_at: {
      type: new GraphQLNonNull(GraphQLString)
    },
    updated_at: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})

const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: () => ({
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: function (comment) {
        return userModel.getById(comment.id, (err, user) => {
          if (err) { throw err }
          return user
        })
      }
    },
    text: {
      type: new GraphQLNonNull(GraphQLString)
    },
    subcomments: {
      type: new GraphQLList(CommentType)
    },
    created_at: {
      type: new GraphQLNonNull(GraphQLString)
    },
    updated_at: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})

const TagType = new GraphQLObjectType({
  name: 'TagType',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    categories: {
      type: new GraphQLList(GraphQLString)
    }
  })
})

const LanguageType = new GraphQLObjectType({
  name: 'LanguageType',
  fields: () => ({
    audios: {
      type: new GraphQLList(GraphQLString)
    },
    subtitles: {
      type: new GraphQLList(GraphQLString)
    }
  })
})

const StatusType = new GraphQLObjectType({
  name: 'StatusType',
  fields: () => ({
    leechers: {
      type: GraphQLInt
    },
    seeders: {
      type: GraphQLInt
    }
  })
})

const TagInputType = new GraphQLInputObjectType({
  name: 'TagInputType',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    categories: {
      type: new GraphQLList(GraphQLString)
    }
  })
})

const LanguageInputType = new GraphQLInputObjectType({
  name: 'LanguageInputType',
  fields: () => ({
    audios: {
      type: new GraphQLList(GraphQLString)
    },
    subtitles: {
      type: new GraphQLList(GraphQLString)
    }
  })
})

const StatusInputType = new GraphQLInputObjectType({
  name: 'StatusInputType',
  fields: () => ({
    leechers: {
      type: GraphQLInt
    },
    seeders: {
      type: GraphQLInt
    }
  })
})

// TorrentType for graphql
const TorrentType = new GraphQLObjectType({
  name: 'Torrent',
  description: 'This represent a torrent',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: function (torrent) {
        return userModel.getById(torrent.user_id, (err, user) => {
          if (err) { throw err }
          return user
        })
      }
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    size: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    imdb_id: {
      type: GraphQLString
    },
    info_link: {
      type: GraphQLString
    },
    info_hash: {
      type: new GraphQLNonNull(GraphQLString)
    },
    status: {
      type: StatusType
    },
    screens: {
      type: new GraphQLList(GraphQLString)
    },
    comments: {
      type: new GraphQLList(CommentType)
    },
    tag: {
      type: new GraphQLNonNull(TagType)
    },
    language: {
      type: new GraphQLNonNull(LanguageType)
    },
    kafa: {
      type: GraphQLInt,
      resolve: function (torrent) {
        return kafaModel.total(torrent.id)
          .then(kafa => {
            return kafa[0].total
          })
          .catch(err => {
            console.log(err)
            // TODO: Error report
            return 0
          })
      }
    },
    download_count: {
      type: GraphQLInt
    },
    created_at: {
      type: new GraphQLNonNull(GraphQLString)
    },
    updated_at: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})

// TorrentCreateInputType for mutation
const TorrentCreateInputType = new GraphQLInputObjectType({
  name: 'TorrentCreateInputType',
  description: 'This represent an torrent',
  fields: () => ({
    user_id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    },
    size: {
      type: GraphQLInt
    },
    imdb_id: {
      type: GraphQLString
    },
    info_link: {
      type: GraphQLString
    },
    info_hash: {
      type: new GraphQLNonNull(GraphQLString)
    },
    screens: {
      type: new GraphQLList(GraphQLString)
    },
    tag: {
      type: new GraphQLNonNull(TagInputType)
    },
    language: {
      type: new GraphQLNonNull(LanguageInputType)
    },
    status: {
      type: StatusInputType
    }
  })
})

// TorrentUpdateInputType for mutation
const TorrentUpdateInputType = new GraphQLInputObjectType({
  name: 'TorrentUpdateInputType',
  description: 'This represent an torrent',
  fields: () => ({
    user_id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    size: {
      type: GraphQLInt
    },
    imdb_id: {
      type: GraphQLString
    },
    info_link: {
      type: GraphQLString
    },
    info_hash: {
      type: GraphQLString
    },
    screens: {
      type: new GraphQLList(GraphQLString)
    },
    tag: {
      type: TagInputType
    },
    language: {
      type: LanguageInputType
    },
    status: {
      type: StatusInputType
    }
  })
})

const TorrentIncrementInputType = new GraphQLInputObjectType({
  name: 'TorrentIncrementInputType',
  description: 'This represent a kafa',
  fields: () => ({
    torrent_id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})

module.exports = {
  CommentType,
  TagType,
  LanguageType,
  StatusType,
  TorrentType,
  TorrentCreateInputType,
  TorrentUpdateInputType,
  TorrentIncrementInputType
}
