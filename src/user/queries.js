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
          type: GraphQLString
        },
        email: {
          name: 'email',
          type: GraphQLString
        },
        created_at_from: {
          name: 'created_at_from',
          type: GraphQLString
        },
        created_at_to: {
          name: 'created_at_to',
          type: GraphQLString
        },
        updated_at_from: {
          name: 'updated_at_from',
          type: GraphQLString
        },
        updated_at_to: {
          name: 'updated_at_to',
          type: GraphQLString
        },
        limit: {
          name: 'limit',
          type: GraphQLInt
        },
        skip: {
          name: 'skip',
          type: GraphQLInt
        },
        sort_field: {
          name: 'sort_field',
          type: GraphQLString
        },
        sort_type: {
          name: 'sort_type',
          type: GraphQLInt
        }
      },
       resolve: function(parent, args, ast) {
       return userModel.list(args, (err, users) => {
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
          type: GraphQLString
        }
      },
      resolve: function(parent, args, ast) {
        return userModel.getById(args.id, (err, user) => {
           if (err)
             throw err;
           return user;
         });
      }
    },
    userByUsername: {
      type: new GraphQLNonNull(userTypes.UserType),
      description: "Get user by username",
      args: {
        username: {
          name: 'username',
          type: GraphQLString
        }
      },
      resolve: function(parent, args, ast) {
        return userModel.getOne(args, (err, user) => {
           if (err)
             throw err;
           return user;
         });
      }
    },
    userByEmail: {
      type: new GraphQLNonNull(userTypes.UserType),
      description: "Get user by email",
      args: {
        email: {
          name: 'email',
          type: GraphQLString
        }
      },
      resolve: function(parent, args, ast) {
        return userModel.getOne(args, (err, user) => {
           if (err)
             throw err;
           return user;
         });
      }
    }
  })
});
