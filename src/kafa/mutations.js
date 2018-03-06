

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
					type: new GraphQLNonNull(kafaTypes.KafaCreateInputType),
				},
			},
			resolve: function (parent, {
				input
			}, context) {
				if(context.rootValue.user.id != input.user_id){
					throw new Error('Your id not match!');
				}
				return kafaModel.create(input).then(function (kafa) {
					return kafa
				})
			}
		},
		updateKafa: {
			type: new GraphQLNonNull(kafaTypes.KafaType),
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLString),
				},
				input: {
					type: new GraphQLNonNull(kafaTypes.KafaUpdateInputType),
				}
			},
			resolve: function (parent, args, context) {
				return kafaModel.findByIdAndUpdate(args.id, {
						"$set": args.input
					}).exec()
					.then((kafa) => {
						return kafa
					})
					.catch((err) => {
						throw err;
					})
			}
		},
		deleteKafa: {
			type: GraphQLString,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLString),
				}
			},
			resolve: function (parent, args, context) {
				return kafaModel.findByIdAndRemove(args.id).exec()
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
