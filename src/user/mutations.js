// Mongoose schemas
const userModel = require('./models.js');

// Graphql Types
const userTypes = require('./types.js');

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
const UserMutationRootType = module.exports = new GraphQLObjectType({
  name: 'UserMutationAppSchema',
  description: "User Schema Mutation Root",
  fields: () => ({
    createUser: {
    type: new GraphQLNonNull(userTypes.UserType),
    args: {
      input: {
        type: new GraphQLNonNull(userTypes.UserCreateInputType),
      },
    },
    resolve: function(parent, {input}, ast) {
    return userModel.create(input).then(function (user) {
      return user
    })
   }
    },
    updateUser: {
    type: new GraphQLNonNull(userTypes.UserType),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      input: {
        type: new GraphQLNonNull(userTypes.UserUpdateInputType),
      }
    },
    resolve: function(parent, args, ast) {
     return userModel.findByIdAndUpdate(args.id, {"$set":args.input}).exec()
     .then((user)=>{
       return user
     })
     .catch((err)=>{
       throw err;
     })
   }
    },
    deleteUser: {
    type: GraphQLString,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      }
    },
    resolve: function(parent, args, ast) {
     return userModel.findByIdAndRemove(args.id).exec()
     .then(()=>{
       return "deleted"
     })
     .catch((err)=>{
       throw err;
     })
   }
    }
  })
});
