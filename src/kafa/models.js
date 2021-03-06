
const mongoose = require('mongoose')

// Kafa Schema
const KafaSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  torrent_id: {
    type: String,
    required: true
  },
  kafa_count: {
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
})

const Kafa = module.exports = mongoose.model('Kafa', KafaSchema)

// Create Kafa
module.exports.new = function (input) {
  return Kafa.create(input)
}

module.exports.update = function (query, input) {
  input.updated_at = new Date()
  return Kafa.findOneAndUpdate(query, {
    '$set': input
  }, {new: true})
}

module.exports.updateById = function (id, input) {
  input.updated_at = new Date()
  return Kafa.findByIdAndUpdate(id, {
    '$set': input
  }, {new: true})
}

module.exports.incrementKafaCount = function (userId, torrentId) {
  return Kafa.findOneAndUpdate({
    'user_id': userId,
    'torrent_id': torrentId}, {
    '$inc': {'kafa_count': 1},
    '$set': {'updated_at': new Date()}
  }, {upsert: true, new: true})
}

module.exports.total = function (torrentId, callback) {
  return Kafa.aggregate([
    {
      '$match': {
        'torrent_id': torrentId
      }
    },
    {
      '$group': {
        '_id': null,
        'total': {$sum: '$kafa_count'}
      }
    }
  ], callback)
}

module.exports.list = function (filter, callback) {
  let limit = 25
  let skip = 0
  let sort = {}

  if (filter.limit) { limit = filter.limit }

  if (filter.page) { skip = filter.page > 0 ? ((filter.page - 1) * limit) : 0 }

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

  if (filter.torrent_id) { query['torrent_id'] = filter.torrent_id }

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

  return Kafa.find(query, callback).skip(skip).limit(limit).sort(sort)
}
