const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const util = require('util');


// User Schema
const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	verified: {
		type: Boolean,
		default: false
	},
	birthday: {
		type: Date,
		required: true
	},
	email_activation_key: {
		type: String
	},
	forgot_password_token: {
		type: String
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

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.comparePassword = function(password, hash) {
  return bcrypt.compareSync(password, hash);
}

// Create User
module.exports.new = function (input) {
	input.birthday = new Date(input.birthday);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(input.password, salt);
	input.password = hash;
	input.email_activation_key = crypto.randomBytes(20).toString('hex');
	return User.create(input);
}

module.exports.getById = function (id, callback) {
	return User.findById(id, callback);
}

module.exports.getOne = function (query, callback) {
	return User.findOne(query, callback);
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

	if (filter.username)
		query["username"] = {
			"$regex": util.format(".*%s.*", filter.username),
			"$options": 'i'
		};

	if (filter.email)
		query["email"] = {
			"$regex": util.format(".*%s.*", filter.email),
			"$options": 'i'
		};

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

	return User.find(query, callback).skip(skip).limit(limit).sort(sort);
}
