
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const config = require('../config')
const mailgun = require('../kitbag/mailgun')

// Mongoose schemas
const userModel = require('../user/models.js')
const roleModel = require('../role/models.js')

// Graphql Types
const tokenTypes = require('./types.js')
const userTypes = require('../user/types.js')

let {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql')

// This is the Root Mutation
const TokenMutationRootType = new GraphQLObjectType({
  name: 'TokenMutationAppSchema',
  description: 'Token Schema Mutation Root',
  fields: () => ({
    createToken: {
      type: new GraphQLNonNull(tokenTypes.TokenType),
      args: {
        input: {
          type: new GraphQLNonNull(tokenTypes.TokenCreateInputType)
        }
      },
      resolve: function (parent, {
        input
      }, context) {
        let inputPassword = input.password
        delete input.password
        return userModel.getOne(input)
          .then((user) => {
            if (user === null) throw new Error('User not found!')
            if (!user.verified) throw new Error('You are not verified!')
            if (userModel.comparePassword(inputPassword, user.password)) {
              const token = jwt.sign({
                user
              }, config.SECRET_KEY, {
                expiresIn: 604800 // 1 week
              })
              let tokenObj = tokenTypes.TokenType
              tokenObj = {
                token: token,
                user_id: user.id
              }
              return tokenObj
            } else {
              throw new Error('Wrong Password')
            }
          })
          .catch((err) => {
            throw err
          })
      }
    },
    createUser: {
      type: new GraphQLNonNull(userTypes.UserType),
      args: {
        input: {
          type: new GraphQLNonNull(userTypes.UserCreateInputType)
        }
      },
      resolve: function (parent, {
        input
      }, context) {
        input.password = userModel.createPasswordHash(input.password)
        return userModel.new(input)
          .then(function (user) {
            mailgun.sendMail(user.email, 'Account Verification',
              'Please confirm your email with click below button.',
              'Confirm Your Email', 'http://kafa.io/activation/' + user.email_verification_key)
            return user
          })
          .catch((err) => {
            throw err
          })
      }
    },
    verifyUser: {
      type: GraphQLString,
      args: {
        email_verification_key: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function (parent, args, context) {
        return userModel.findOneAndUpdate(args, {
          '$set': {verified: true}
        }).exec()
          .then((user) => {
            roleModel.new({
              user_id: user.id
            })
            return user
          })
          .catch((err) => {
            throw err
          })
      }
    },
    forgotPass: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function (parent, args, context) {
        return userModel.findOneAndUpdate(args, {
          '$set': {forgot_password_token: crypto.randomBytes(20).toString('hex')}
        }).exec()
          .then((user) => {
            mailgun.sendMail(user.email, 'Forgot Password',
              'Please click below button and change your password.',
              'Change Your Password', 'http://kafa.io/forgot_pass/' + user.forgot_password_token)
            return 'Check Your Email'
          })
          .catch((err) => {
            throw err
          })
      }
    },
    forgotPassComplete: {
      type: new GraphQLNonNull(userTypes.UserType),
      args: {
        forgot_password_token: {
          type: new GraphQLNonNull(GraphQLString)
        },
        input: {
          type: new GraphQLNonNull(userTypes.UserChangePassInputType)
        }
      },
      resolve: function (parent, args, context) {
        args.input.password = crypto.randomBytes(20).toString('hex')
        return userModel.findOneAndUpdate({'forgot_password_token': args.forgot_password_token}, {
          '$set': args.input
        }).exec()
          .then((user) => {
            mailgun.sendMail(user.email, 'Your Password Changed',
              'This email sended for information.',
              'Go to kafa.io', 'http://kafa.io/')
            return user
          })
          .catch((err) => {
            throw err
          })
      }
    }
  })
})

module.exports = TokenMutationRootType
