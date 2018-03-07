

let {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema
} = require('graphql');

// This is the Root Query
const TokenQueryRootType = module.exports = new GraphQLObjectType({
	name: 'TokenQuerySchema',
	description: "Token Schema Query Root",
	fields: () => ({
    tokens:{
      type: GraphQLString,
			description: "List of all Tokens",
      resolve: function (parent, args, context) {
				return null
			}
    }
	})
});
