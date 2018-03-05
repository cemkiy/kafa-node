// Mongoose schemas
const kafaModel = require('./models.js');

// Graphql Types
const kafaTypes = require('./types.js');

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');

// mutation {
//    createKafa(input: {
//     email: "graphql@test.com"
//    }) {
//     id,
//     email
//   }
// }

// This is the Root Mutation
const KafaMutationRootType = module.exports = new GraphQLObjectType({
  name: 'KafaMutationAppSchema',
  description: "Kafa Schema Mutation Root",
  fields: () => ({
    createKafa: {
    type: new GraphQLNonNull(kafaTypes.KafaType),
    args: {
      input: {
        type: new GraphQLNonNull(kafaTypes.KafaInputType),
      },
    },
    resolve: async (rootValue, { input }) => {
      const result = await new Promise((resolve) => {
        setTimeout(() =>
          resolve(
            kafaModel.create(input, (err, kafa) => {
              if(err) throw err;
              return kafa;
            })
          ), 100);
      });
        return result;
        }
    },
    updateKafa: {
    type: new GraphQLNonNull(kafaTypes.KafaType),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      input: {
        type: new GraphQLNonNull(kafaTypes.KafaInputType),
      }
    },
    resolve: async (rootValue, args) => {
      const result = await new Promise((resolve) => {
        setTimeout(() =>
          resolve(
            kafaModel.update(args.id, args.input, (err, updatedKafa) => {
              if(err) throw err;
              return updatedKafa;
            })
          ), 100);
      });
        return result;
        }
    },
    deleteKafa: {
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
            kafaModel.findByIdAndRemove(args.id, (err, kafa) => {
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
