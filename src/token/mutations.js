

const jwt = require('jsonwebtoken');
const config = require('../config');

// Mongoose schemas
const userModel = require('../user/models.js');

// Graphql Types
const tokenTypes = require('./types.js');
const userTypes = require('../user/types.js');

let {
 GraphQLString,
 GraphQLInt,
 GraphQLList,
 GraphQLObjectType,
 GraphQLNonNull,
 GraphQLSchema
} = require('graphql');

// mutation {
//    createUser(input: {
//     email: "graphql@test.com"
//    }) {
//     id,
//     email
//   }
// }

// This is the Root Mutation
const TokenMutationRootType = module.exports = new GraphQLObjectType({
 name: 'TokenMutationAppSchema',
 description: "Token Schema Mutation Root",
 fields: () => ({
   createToken: {
     type: new GraphQLNonNull(tokenTypes.TokenType),
     args: {
       input: {
         type: new GraphQLNonNull(tokenTypes.TokenCreateInputType),
       },
     },
     resolve: function (parent, {
       input
     }, ast) {
       return userModel.getOne(input).exec()
         .then((user) => {
           const token = jwt.sign({
             user
           }, config.SECRET_KEY, {
             expiresIn: 604800 // 1 week
           });
           tokenObj = tokenTypes.TokenType;
           tokenObj = {
             token: token,
             user_id: user.id
           }
           return tokenObj;
         })
         .catch((err) => {
           throw err;
         })
     }
   },
   createUser: {
     type: new GraphQLNonNull(userTypes.UserType),
     args: {
       input: {
         type: new GraphQLNonNull(userTypes.UserCreateInputType),
       },
     },
     resolve: function (parent, {
       input
     }, context) {
       return userModel.create(input).then(function (user) {
         return user
       })
     }
   }
 })
});
