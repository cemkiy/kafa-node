

// Mongoose schemas
const torrentModel = require('../torrent/models.js');
const userModel = require('../user/models.js');
const kafaModel = require('./models.js');

// Graphql Types
const torrentTypes = require('../torrent/types.js');
const userTypes = require('../user/types.js');
const kafaTypes = require('./types.js');

let {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema
} = require('graphql');


// This is the Root Query
const KafaQueryRootType = module.exports = new GraphQLObjectType({
	name: 'KafaQuerySchema',
	description: "Kafa Schema Query Root",
	fields: () => ({
		kafas: {
			type: new GraphQLList(kafaTypes.KafaType),
			description: "List of all Kafas",
			args: {
				user_id: {
					name: 'user_id',
					type: GraphQLString
				},
				torrent_id: {
					name: 'torrent_id',
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
			resolve: function (parent, args, context) {
				return kafaModel.list(args, (err, kafas) => {
					if (err)
						throw err;
					return kafas;
				});
			}
		},
		kafaById: {
			type: new GraphQLNonNull(kafaTypes.KafaType),
			description: "Get kafa by id",
			args: {
				id: {
					name: 'id',
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: function (parent, args, context) {
				return kafaModel.getById(args.id, (err, kafa) => {
					if (err)
						throw err;
					return kafa;
				});
			}
		}
	})
});
