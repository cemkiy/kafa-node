

// Mongoose schemas
const userModel = require('../user/models.js');


let {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema,
	GraphQLInputObjectType
} = require('graphql');

const userType = new GraphQLObjectType({
	name: "roleUserType",
	description: "This represent an user",
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		username: {
			type: new GraphQLNonNull(GraphQLString)
		},
		email: {
			type: new GraphQLNonNull(GraphQLString)
		},
		about: {
			type: GraphQLString
		},
		birthday: {
			type: new GraphQLNonNull(GraphQLString)
		},
		created_at: {
			type: new GraphQLNonNull(GraphQLString)
		},
		updated_at: {
			type: new GraphQLNonNull(GraphQLString)
		}
	})
});


const RoleType = new GraphQLObjectType({
	name: 'RoleType',
	description: "This represent a role",
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLString)},
		user: {
			type: new GraphQLNonNull(userType),
			resolve: function (role) {
				return userModel.getById({id: role.user_id}, (err, user) => {
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
			type: new GraphQLNonNull(GraphQLString)
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
