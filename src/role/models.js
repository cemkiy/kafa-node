
const mongoose = require('mongoose')

// Role Schema
const RoleSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  type: {
    type: String,
    required: true,
    default: 'user'
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

const Role = module.exports = mongoose.model('Role', RoleSchema)

// Create Role
module.exports.new = function (input) {
  return Role.create(input)
}

module.exports.getById = function (id, callback) {
  return Role.findById(id, callback)
}

module.exports.getOne = function (query, callback) {
  return Role.findOne(query, callback)
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

  if (filter.user_id) { query['user_id'] = filter.user_id }

  if (filter.type) { query['type'] = filter.type }

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

  return Role.find(query, callback).skip(skip).limit(limit).sort(sort)
}
