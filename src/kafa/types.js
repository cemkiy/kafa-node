

// Mongoose schemas
const torrentModel = require('../torrent/models.js');

// Graphql Types
const userTypes = require('../user/types.js');
const torrentTypes = require('../torrent/types.js');

let {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema,
	GraphQLInputObjectType
} = require('graphql');


const KafaType = new GraphQLObjectType({
	name: 'KafaType',
	description: "This represent a kafa",
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLString)},
		torrent: {
			type: new GraphQLNonNull(torrentTypes.TorrentType),
			resolve: function (kafa) {
				return torrentModel.getById(kafa.torrent_id, (err, torrent) => {
					if (err)
						throw err;
					return torrent;
				});
			}
		},
		user: {
			type: new GraphQLNonNull(userTypes.UserType),
			resolve: function (comment) {
				return userModel.getById(comment.id, (err, user) => {
					if (err)
						throw err;
					return user;
				});
			}
		},
		kafa_count: {
			type: new GraphQLNonNull(GraphQLInt)
		}
	})
})

const KafaCreateInputType = new GraphQLInputObjectType({
	name: 'KafaCreateInputType',
	description: "This represent a kafa",
	fields: () => ({
		torrent_id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		user_id: {
			type: new GraphQLNonNull(GraphQLString)
		}
	})
})

const KafaUpdateInputType = new GraphQLInputObjectType({
	name: 'KafaUpdateInputType',
	description: "This represent a kafa",
	fields: () => ({
		torrent_id: {
			type: GraphQLString
		},
		user_id: {
			type: GraphQLString
		},
		kafa_count: {
			type: GraphQLInt
		}
	})
})

module.exports = {
	KafaType,
	KafaCreateInputType,
	KafaUpdateInputType
}
