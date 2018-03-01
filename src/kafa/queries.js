// Mongoose schemas
const torrentModel = require('../torrent/models.js');
const userModel = require('./models.js');

// Graphql Types
const torrentTypes = require('../torrent/types.js');
const userTypes = require('./types.js');

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql');


// This is the Root Query
const UserQueryRootType = module.exports = new GraphQLObjectType({
  name: 'UserQuerySchema',
  description: "User Schema Query Root",
  fields: () => ({
    users: {
      type: new GraphQLList(userTypes.UserType),
      description: "List of all Users",
      args: {
        username: {
          name: 'username',
          type: new GraphQLNonNull(GraphQLString)
        },
        email: {
          name: 'email',
          type: new GraphQLNonNull(GraphQLString)
        },
        created_at_from: {
          name: 'created_at_from',
          type: new GraphQLNonNull(GraphQLString)
        },
        created_at_to: {
          name: 'created_at_to',
          type: new GraphQLNonNull(GraphQLString)
        },
        updated_at_from: {
          name: 'updated_at_from',
          type: new GraphQLNonNull(GraphQLString)
        },
        updated_at_to: {
          name: 'updated_at_to',
          type: new GraphQLNonNull(GraphQLString)
        },
        limit: {
          name: 'limit',
          type: new GraphQLNonNull(GraphQLInt)
        },
        skip: {
          name: 'skip',
          type: new GraphQLNonNull(GraphQLInt)
        },
        sort_field: {
          name: 'sort_field',
          type: new GraphQLNonNull(GraphQLString)
        },
        sort_type: {
          name: 'sort_type',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: function(parent, args, ast) {
        userModel.list(args, (err, users) => {
          if (err)
            throw err;
          return users;
        });
      }
    },
    userById: {
      type: new GraphQLNonNull(userTypes.UserType),
      description: "Get user by id",
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function(parent, args, ast) {
        return userModel.findById(args.id);
      }
    },
    userByUsername: {
      type: new GraphQLNonNull(userTypes.UserType),
      description: "Get user by username",
      args: {
        id: {
          name: 'username',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function(parent, args, ast) {
        return userModel.findOne(args);
      }
    },
    userByEmail: {
      type: new GraphQLNonNull(userTypes.UserType),
      description: "Get user by email",
      args: {
        id: {
          name: 'email',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function(parent, args, ast) {
        return userModel.findOne(args);
      }
    }
  })
});
