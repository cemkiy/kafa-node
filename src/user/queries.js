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

// This is the Root Query
const UserQueryRootType = new GraphQLObjectType({
  name: 'UserAppSchema',
  description: "Torrent Schema Query Root",
  fields: () => ({
    users: {
      type: new GraphQLList(userType),
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
      type: new GraphQLNonNull(userType),
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
      type: new GraphQLNonNull(userType),
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
      type: new GraphQLNonNull(userType),
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
