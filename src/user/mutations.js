// Mongoose schemas
const torrentModel = require('./torrent/model.js');
const userModel = require('./user/model.js');

// Graphql Types
const torrentType = require('./torrent/type.js');
const userType = require('./user/type.js');

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
const UserMutationRootType = new GraphQLObjectType({
  name: 'UserAppSchema',
  description: "User Schema Mutation Root",
  fields: () => ({
    createUser: {
    type: UserType,
    args: {
      input: {
        type: new GraphQLNonNull(UserInputType),
      },
    },
    resolve: async (rootValue, { input }) => {
      if (!isEmail(input.email)) {
       throw new Error('The email is not in a valid format');
      }
      const result = await new Promise((resolve) => {
        setTimeout(() =>
          resolve(
            return userModel.create(input);
          ), 100);
      });
        return result;
        }
    }
  })
});
