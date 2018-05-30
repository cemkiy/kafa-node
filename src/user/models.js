const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const mongoose = require('mongoose')
const util = require('util')

// User Schema
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  password: {
    type: String,
    required: true
  },
  about: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  birthday: {
    type: Date,
    required: true
  },
  email_verification_key: {
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
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.comparePassword = function (password, hash) {
  return bcrypt.compareSync(password, hash)
}

module.exports.createPasswordHash = function (password) {
  var salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

// Create User
module.exports.new = function (input) {
  input.birthday = new Date(input.birthday)
  input.email_verification_key = crypto.randomBytes(20).toString('hex')
  return User.create(input)
}

module.exports.update = function (query, input) {
  input.updated_at = new Date()
  return User.findOneAndUpdate(query, {
    '$set': input
    }, {new: true})
}

module.exports.updateById = function (id, input) {
  input.updated_at = new Date()
  return User.findByIdAndUpdate(id, {
    '$set': input
    }, {new: true})
}

module.exports.getById = function (id, callback) {
  return User.findById(id, callback)
}

module.exports.getOne = function (query, callback) {
  return User.findOne(query, callback)
}

module.exports.list = function (filter, callback) {
  let limit = 25
  let skip = 0
  let sort = {}

  if (filter.limit) { limit = filter.limit }

  if (filter.page) { skip =  filter.page > 0 ? ( ( filter.page - 1 ) * limit ) : 0 }

  if (filter.sort_field) {
    if (filter.sort_type) {
      sort[filter.sort_field] = filter.sort_type
    } else {
      sort[filter.sort_field] = 1
    }
  } else {
    sort['created_at'] = 1
  }

  let query = {}

  if (filter.username) {
    query['username'] = {
      '$regex': util.format('.*%s.*', filter.username),
      '$options': 'i'
    }
  }

  if (filter.email) {
    query['email'] = {
      '$regex': util.format('.*%s.*', filter.email),
      '$options': 'i'
    }
  }

  if (filter.created_at_from || filter.created_at_to) {
    let createdAtQuery = {}
    if (filter.created_at_from) { createdAtQuery['$gt'] = new Date(filter.created_at_from) }
    if (filter.created_at_to) { createdAtQuery['$lt'] = new Date(filter.created_at_to) }
    query['created_at'] = createdAtQuery
  }

  if (filter.updated_at_from || filter.updated_at_to) {
    let updatedAtQuery = {}
    if (filter.updated_at_from) { updatedAtQuery['$gt'] = new Date(filter.updated_at_from) }
    if (filter.updated_at_to) { updatedAtQuery['$lt'] = new Date(filter.updated_at_to) }
    query['updated_at'] = updatedAtQuery
  }

  return User.find(query, callback).skip(skip).limit(limit).sort(sort)
}
