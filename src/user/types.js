
// Mongoose schemas
const roleModel = require('../role/models.js')
const torrentModel = require('../torrent/models.js')

// Graphql Types
const roleTypes = require('../role/types.js')
const torrentTypes = require('../torrent/types.js')

let {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require('graphql')

// UserType for query
const UserType = new GraphQLObjectType({
  name: 'UserType',
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
    role: {
      type: new GraphQLNonNull(roleTypes.RoleType),
      resolve: function (user) {
        return roleModel.getOne({user_id: user.id}, (err, role) => {
          if (err) { throw err }
          return role
        })
      }
    },
    torrents: {
      type: new GraphQLList(torrentTypes.TorrentType),
      resolve: function (user) {
        return torrentModel.list({user_id: user.id}, (err, role) => {
          if (err) { throw err }
          return role
        })
      }
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

// UserCreateInputType for mutation
const UserCreateInputType = new GraphQLInputObjectType({
  name: 'UserCreateInputType',
  description: 'Used for create user',
  fields: () => ({
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
    about: {
      type: GraphQLString
    },
    birthday: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})

// UserUpdateInputType for mutation
const UserUpdateInputType = new GraphQLInputObjectType({
  name: 'UserUpdateInputType',
  description: 'Used for update user',
  fields: () => ({
    about: {
      type: GraphQLString
    }
  })
})

// UserChangeEmailInputType for mutation
const UserChangeEmailInputType = new GraphQLInputObjectType({
  name: 'UserChangeEmailInputType',
  description: 'Used for email change',
  fields: () => ({
    email: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})

// UserChangePassInputType for mutation
const UserChangePassInputType = new GraphQLInputObjectType({
  name: 'UserChangePassInputType',
  description: 'Used for change pass',
  fields: () => ({
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})

module.exports = {
  UserType,
  UserCreateInputType,
  UserUpdateInputType,
  UserChangePassInputType,
  UserChangeEmailInputType
}
