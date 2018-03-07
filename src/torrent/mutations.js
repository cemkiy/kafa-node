const config = require('../config/security.js');

// Mongoose schemas
const torrentModel = require('./models.js');

// Graphql Types
const torrentTypes = require('./types.js');

let {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema
} = require('graphql');

// mutation {
//    createUser(input: {
//     email: "graphql@test.com"
//    }) {
//     id,
//     email
//   }
// }

// This is the Root Mutation
const TorrentMutationRootType = module.exports = new GraphQLObjectType({
	name: 'TorrentMutationSchema',
	description: "Torrent Schema Mutation Root",
	fields: () => ({
		createTorrent: {
			type: new GraphQLNonNull(torrentTypes.TorrentType),
			args: {
				input: {
					type: new GraphQLNonNull(torrentTypes.TorrentCreateInputType),
				},
			},
			resolve: function (parent, {
				input
			}, context) {
				config.securityPointForCreateSource(context.rootValue, ['user', 'admin']);
				return torrentModel.new(input).then(function (torrent) {
					return torrent
				})
			}
		},
		updateTorrent: {
			type: new GraphQLNonNull(torrentTypes.TorrentType),
			args: {
				input: {
					type: new GraphQLNonNull(torrentTypes.TorrentUpdateInputType),
				},
			},
			resolve: function (parent, args, context) {
				config.securityPointForChangeSource(context.rootValue, args.id, ['source_owner', 'admin']);
				return torrentModel.findByIdAndUpdate(args.id, {
						"$set": args.input
					}).exec()
					.then((torrent) => {
						return torrent
					})
					.catch((err) => {
						throw err;
					})
			}
		},
		deleteTorrent: {
			type: GraphQLString,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLString),
				}
			},
			resolve: function (parent, args, context) {
				config.securityPointForChangeSource(context.rootValue, args.id, ['source_owner', 'admin']);
				return torrentModel.findByIdAndRemove(args.id).exec()
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
