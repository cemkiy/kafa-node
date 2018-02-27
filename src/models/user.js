const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  }
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

// Set Password User
module.exports.setPassword = function(user, password, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err)
        throw err;
      user.password = hash;
      user.forgot_password_token = "";
      user.save(callback);
    });
  })
}

// Compare Password
module.exports.comparePassword = function(password, hash, callback) {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err)
      throw err;

    callback(null, isMatch);
  })
}
