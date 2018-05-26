const crypto = require('crypto')
const mailgun = require('../kitbag/mailgun')

// Config files
const config = require('../config/security.js')

// Mongoose schemas
const userModel = require('./models.js')

// Graphql Types
const userTypes = require('./types.js')

let {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql')

// This is the Root Mutation
const UserMutationRootType = new GraphQLObjectType({
  name: 'UserMutationAppSchema',
  description: 'User Schema Mutation Root',
  fields: () => ({
    updateUser: {
      type: new GraphQLNonNull(userTypes.UserType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        input: {
          type: new GraphQLNonNull(userTypes.UserUpdateInputType)
        }
      },
      resolve: function (parent, args, rootValue) {
        let query = config.securityPointForChangeSource(rootValue, args.id, ['source_owner', 'captain', 'buccaneer', 'privateer'])
        return userModel.findOneAndUpdate(query, {
          '$set': args.input
        }, {new: true}).exec()
          .then((user) => {
            return user
          })
          .catch((err) => {
            throw err
          })
      }
    },
    changePass: {
      type: new GraphQLNonNull(userTypes.UserType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        input: {
          type: new GraphQLNonNull(userTypes.UserChangePassInputType)
        }
      },
      resolve: function (parent, args, rootValue) {
        let query = config.securityPointForChangeSource(rootValue, args.id, ['source_owner', 'captain', 'buccaneer', 'privateer'])
        args.input.password = userModel.createPasswordHash(args.input.password)
        return userModel.findOneAndUpdate(query, {
          '$set': args.input
        }, {new: true}).exec()
          .then((user) => {
            return user
          })
          .catch((err) => {
            throw err
          })
      }
    },
    updateEmail: {
      type: new GraphQLNonNull(userTypes.UserType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        input: {
          type: new GraphQLNonNull(userTypes.UserChangeEmailInputType)
        }
      },
      resolve: function (parent, args, rootValue) {
        let query = config.securityPointForChangeSource(rootValue, args.id, ['source_owner', 'captain', 'buccaneer', 'privateer'])
        args.input.email_verification_key = crypto.randomBytes(20).toString('hex')
        args.input.verified = false
        return userModel.findOneAndUpdate(query, {
          '$set': args.input
        }, {new: true}).exec()
          .then((user) => {
            mailgun.sendMail(user.email, 'Verified Your New Email',
              'Please confirm your email with click below button.',
              'Confirm Your Email', 'http://kafa.io/activation/' + user.email_verification_key)
            return user
          })
          .catch((err) => {
            throw err
          })
      }
    },
    deleteUser: {
      type: GraphQLString,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function (parent, args, rootValue) {
        let query = config.securityPointForChangeSource(rootValue, args.id, ['privateer'])
        return userModel.findOneAndRemove(query).exec()
          .then(() => {
            return 'deleted'
          })
          .catch((err) => {
            throw err
          })
      }
    }
  })
})

module.exports = UserMutationRootType
