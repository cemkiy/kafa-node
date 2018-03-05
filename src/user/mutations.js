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
        type: new GraphQLNonNull(userTypes.UserInputType),
      },
    },
    resolve: async (rootValue, { input }) => {
      const result = await new Promise((resolve) => {
        setTimeout(() =>
          resolve(
            userModel.create(input, (err, user) => {
              if(err) throw err;
              return user;
            })
          ), 100);
      });
        return result;
        }
    },
    updateUser: {
    type: new GraphQLNonNull(userTypes.UserType),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      input: {
        type: new GraphQLNonNull(userTypes.UserInputType),
      }
    },
    resolve: async (rootValue, args) => {
      const result = await new Promise((resolve) => {
        setTimeout(() =>
          resolve(
            userModel.update(args.id, args.input, (err, updatedUser) => {
              if(err) throw err;
              return updatedUser;
            })
          ), 100);
      });
        return result;
        }
    },
    deleteUser: {
    type: GraphQLString,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      }
    },
    resolve: async (rootValue, args) => {
      const result = await new Promise((resolve) => {
        setTimeout(() =>
          resolve(
            userModel.findByIdAndRemove(args.id, (err, user) => {
              if (err) return "failure";
              return "deleted"
          })
          ), 100);
      });
        return result;
        }
    }
  })
});
