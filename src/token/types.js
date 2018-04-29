// Mongoose schemas
const userTypes = require('../user/types.js')
const userModel = require('../user/models.js')

let {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require('graphql')

// TokenType for query
const TokenType = new GraphQLObjectType({
  name: 'TokenType',
  description: 'This represent an login',
  fields: () => ({
    token: {
      type: new GraphQLNonNull(GraphQLString)
    },
    user: {
      type: new GraphQLNonNull(userTypes.UserType),
      resolve: function (token) {
        return userModel.getById(token.user_id, (err, user) => {
          if (err) { throw err }
          return user
        })
      }
    }
  })
})

// TokenCreateInputType for mutation
const TokenCreateInputType = new GraphQLInputObjectType({
  name: 'TokenCreateType',
  description: 'This represent an login',
  fields: () => ({
    username: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  })
})

module.exports = {
  TokenType,
  TokenCreateInputType
}
