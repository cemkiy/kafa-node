
// Mongoose schemas
const roleModel = require('./models.js')

// Graphql Types
const roleTypes = require('./types.js')

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql')

// This is the Root Query
const RoleQueryRootType = new GraphQLObjectType({
  name: 'RoleQuerySchema',
  description: 'Role Schema Query Root',
  fields: () => ({
    roles: {
      type: new GraphQLList(roleTypes.RoleType),
      description: 'List of all Roles',
      args: {
        user_id: {
          name: 'user_id',
          type: GraphQLString
        },
        type: {
          name: 'type',
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
        page: {
          name: 'page',
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
      resolve: function (parent, args, ast) {
        return roleModel.list(args, (err, roles) => {
          if (err) { throw err }
          return roles
        })
      }
    },
    roleById: {
      type: new GraphQLNonNull(roleTypes.RoleType),
      description: 'Get role by id',
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function (parent, args, ast) {
        return roleModel.getById(args.id, (err, role) => {
          if (err) { throw err }
          return role
        })
      }
    },
    roleByUserId: {
      type: new GraphQLNonNull(roleTypes.RoleType),
      description: 'Get role by user id',
      args: {
        user_id: {
          name: 'user_id',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function (parent, args, ast) {
        return roleModel.getOne(args, (err, role) => {
          if (err) { throw err }
          return role
        })
      }
    }
  })
})

module.exports = RoleQueryRootType
