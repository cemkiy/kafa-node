const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// Language Schema
const LanguageSchema = mongoose.Schema({
	audios: {
		type: [String]
	},
	subtitles: {
		type: [String]
	}
});

// Status Schema
const StatusSchema = mongoose.Schema({
	leechers: {
		type: Number,
		default: 0
	},
	seeders: {
		type: Number,
		default: 0
	}
});

// Comment Schema
const CommentSchema = mongoose.Schema({
	user_id: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	},
	deleted_at: {
		type: Date
	}
});

CommentSchema.add({
	subcomments: [CommentSchema]
});

// Tag Schema
const TagSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	categories: {
		type: [String],
		required: true
	}
});

// Torrent Schema
const TorrentSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	user_id: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	size: {
		type: Number,
		required: true
	},
	info_link: {
		type: String
	},
	status: {
		type: StatusSchema
	},
	info_hash: {
		type: String,
		required: true,
		unique : true,
		dropDups: true
	},
	screens: {
		type: [String]
	},
	comments: {
		type: CommentSchema
	},
	tag: {
		type: TagSchema,
		required: true
	},
	languages: {
		type: LanguageSchema,
		required: true
	},
	kafa: {
		type: Number,
		default: 0
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
});

const Torrent = module.exports = mongoose.model('Torrent', TorrentSchema);

// Create Torrent
module.exports.new = function (input) {
	return Torrent.create(input);
}

module.exports.getById = function (id, callback) {
	return Torrent.findById(id, callback);
}

module.exports.list = function (filter, callback) {
	let limit = 25
	let skip = 0
	let sort = {}

	if (filter.limit)
		limit = filter.limit;

	if (filter.skip)
		skip = filter.skip;

	if (filter.sort_field) {
		if (filter.sort_type) {
			sort[filter.sort_field] = filter.sort_type;
		} else {
			sort[filter.sort_field] = 1;
		}
	} else {
		sort["created_at"] = 1;
	}

	query = {}

	if (filter.name)
		query["name"] = {
			"$regex": util.format(".*%s.*", filter.name),
			"$options": 'i'
		};

	if (filter.user_id)
		query["user_id"] = {
			"$regex": util.format(".*%s.*", filter.user_id),
			"$options": 'i'
		};

	if (filter.info_link)
		query["info_link"] = {
			"$regex": util.format(".*%s.*", filter.info_link),
			"$options": 'i'
		};

	if (filter.info_hash)
		query["info_hash"] = info_hash

	if (filter.tag)
		query["tag.name"] = filter.tag

	if (filter.categories)
		query["tag.categories"] = {
			"$in": filter.categories
		};

	if (filter.audios)
		query["audios"] = {
			"$in": filter.audios
		};

	if (filter.subtitles)
		query["subtitles"] = {
			"$in": filter.subtitles
		};

	if (filter.kafa_from || filter.kafa_to) {
		kafa_query = {}
		if (filter.kafa_from)
			kafa_query["$gt"] = filter.kafa_from;
		if (filter.kafa_to)
			kafa_query["$lt"] = filter.kafa_to;
		query["kafa"] = kafa_query;
	}

	if (filter.created_at_from || filter.created_at_to) {
		created_at_query = {}
		if (filter.created_at_from)
			created_at_query["$gt"] = new Date(filter.created_at_from);
		if (filter.created_at_to)
			created_at_query["$lt"] = new Date(filter.created_at_to);
		query["created_at"] = created_at_query;
	}

	if (filter.updated_at_from || filter.updated_at_to) {
		updated_at_query = {}
		if (filter.updated_at_from)
			updated_at_query["$gt"] = new Date(filter.updated_at_from);
		if (filter.updated_at_to)
			updated_at_query["$lt"] = new Date(filter.updated_at_to);
		query["updated_at"] = updated_at_query;
	}

	return Torrent.find(query, callback).skip(skip).limit(limit).sort(sort);
}
