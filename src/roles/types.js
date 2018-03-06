

// Mongoose schemas
const userModel = require('../user/models.js');

// Graphql Types
const userTypes = require('../user/types.js');

let {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema,
	GraphQLInputObjectType
} = require('graphql');


const RoleType = new GraphQLObjectType({
	name: 'RoleType',
	description: "This represent a role",
	fields: () => ({
		user: {
			type: new GraphQLNonNull(userTypes.UserType),
			resolve: function (role) {
				return userModel.getById(role.id, (err, user) => {
					if (err)
						throw err;
					return user;
				});
			}
		},
		type: {
			type: new GraphQLNonNull(GraphQLString)
		}
	})
})

const RoleCreateInputType = new GraphQLInputObjectType({
	name: 'RoleCreateInputType',
	description: "This represent a role",
	fields: () => ({
		user_id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		type: {
			new GraphQLNonNull(GraphQLString)
		}
	})
})

const RoleUpdateInputType = new GraphQLInputObjectType({
	name: 'RoleUpdateInputType',
	description: "This represent a role",
	fields: () => ({
		type: {
			type: GraphQLString
		}
	})
})

module.exports = {
	RoleType,
	RoleCreateInputType,
	RoleUpdateInputType
}
