const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// Kafa Schema
const KafaSchema = mongoose.Schema({
  torrent_id:{
    type: String,
    required: true
  },
  kafa_count:{
    type: Number,
    default: 0
  }
});

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
  kafas: {
    type: [KafaSchema]
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
  },
  deleted_at: {
    type: Date
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Create User
module.exports.create = function(newUser, callback) {
  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(newUser.password, salt, (err, hash) => {
  //     if (err)
  //       throw err;
  //     newUser.password = hash;
  //     newUser.email_activation_key = crypto.randomBytes(20).toString('hex');
  //     newUser.save(callback);
  //   });
  // })
  newUser.save(callback);
}

module.exports.list = function(filter, callback) {
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

  query = {
    deleted_at: null
  }

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

// Update User
module.exports.update = function(id, updateUser, callback) {
  User.findById(id, function(err, user) {
    if (err) return handleError(err);
    updateUser.updated_at = new Date();
    user.set(updateUser);
    user.save(callback);
  });
}

// Set Password User
// module.exports.setPassword = function(user, password, callback) {
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//       if (err)
//         throw err;
//       user.password = hash;
//       user.forgot_password_token = "";
//       user.save(callback);
//     });
//   })
// }
//
// // Compare Password
// module.exports.comparePassword = function(password, hash, callback) {
//   bcrypt.compare(password, hash, (err, isMatch) => {
//     if (err)
//       throw err;
//
//     callback(null, isMatch);
//   })
// }
