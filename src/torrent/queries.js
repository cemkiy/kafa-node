

// Mongoose schemas
const torrentModel = require('./models.js');

// Graphql Types
const torrentTypes = require('./types.js');

let {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull
} = require('graphql');

// This is the Root Query
const TorrentQueryRootType = module.exports = new GraphQLObjectType({
	name: 'TorrentQuerySchema',
	description: "Torrent Schema Query Root",
	fields: () => ({
		torrents: {
			type: new GraphQLList(torrentTypes.TorrentType),
			description: "List of all Torrents",
			args: {
				name: {
					name: 'name',
					type: GraphQLString
				},
				user_id: {
					name: 'user_id',
					type: GraphQLString
				},
				info_link: {
					name: 'info_link',
					type: GraphQLString
				},
				info_hash: {
					name: 'info_hash',
					type: GraphQLString
				},
				tag: {
					name: 'tag',
					type: GraphQLString
				},
				categories: {
					name: 'categories',
					type: new GraphQLList(GraphQLString)
				},
				audios: {
					name: 'audios',
					type: new GraphQLList(GraphQLString)
				},
				subtitles: {
					name: 'subtitles',
					type: new GraphQLList(GraphQLString)
				},
				kafa_from: {
					name: 'kafa_from',
					type: GraphQLInt
				},
				kafa_to: {
					name: 'kafa_to',
					type: GraphQLInt
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
			resolve: function (parent, args, context) {
				return torrentModel.list(args, (err, torrents) => {
					if (err)
						throw err;
					return torrents;
				});
			}
		},
		torrentById: {
			type: new GraphQLNonNull(torrentTypes.TorrentType),
			description: "Get torrent by id",
			args: {
				id: {
					name: 'id',
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: function (parent, args, context) {
				return torrentModel.getById(args.id, (err, torrent) => {
					if (err)
						throw err;
					return torrent;
				});
			}
		},
	})
});
