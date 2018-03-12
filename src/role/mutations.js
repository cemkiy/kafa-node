// Config files
const config = require('../config/security.js');

// Mongoose schemas
const roleModel = require('./models.js');

// Graphql Types
const roleTypes = require('./types.js');

let {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema
} = require('graphql');

// mutation {
//    createRole(input: {
//     email: "graphql@test.com"
//    }) {
//     id,
//     email
//   }
// }

// This is the Root Mutation
const RoleMutationRootType = module.exports = new GraphQLObjectType({
	name: 'RoleMutationAppSchema',
	description: "Role Schema Mutation Root",
	fields: () => ({
		createRole: {
			type: new GraphQLNonNull(roleTypes.RoleType),
			args: {
				input: {
					type: new GraphQLNonNull(roleTypes.RoleCreateInputType),
				},
			},
			resolve: function (parent, {
				input
			}, context) {
				config.securityPointForCreateSource(context.rootValue, ['admin']);
				return roleModel.new(input)
				.then(function (role) {
					return role
				})
			}
		},
		updateRole: {
			type: new GraphQLNonNull(roleTypes.RoleType),
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLString),
				},
				input: {
					type: new GraphQLNonNull(roleTypes.RoleUpdateInputType),
				}
			},
			resolve: function (parent, args, context) {
				query = config.securityPointForChangeSource(context.rootValue, args.id, ['admin']);
				return roleModel.findOneAndUpdate(query, {
						"$set": args.input
					}).exec()
					.then((role) => {
						return role
					})
					.catch((err) => {
						throw err;
					})
			}
		},
		deleteRole: {
			type: GraphQLString,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLString),
				}
			},
			resolve: function (parent, args, context) {
				query = config.securityPointForChangeSource(context.rootValue, args.id, ['admin']);
				return roleModel.findOneAndRemove(query).exec()
					.then(() => {
						return "deleted"
					})
					.catch((err) => {
						throw err;
					})
			}
		}
	})
});
