const mongoose = require('mongoose')
const util = require('util')

// Language Schema
const LanguageSchema = mongoose.Schema({
  audios: {
    type: [String]
  },
  subtitles: {
    type: [String]
  }
})

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
})

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
})

CommentSchema.add({
  subcomments: [CommentSchema]
})

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
})

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
    type: String
  },
  size: {
    type: Number
  },
  imdb_id : {
    type: String
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
    unique: true,
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
  language: {
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
})

const Torrent = module.exports = mongoose.model('Torrent', TorrentSchema)

// Create Torrent
module.exports.new = function (input) {
  return Torrent.create(input)
}

module.exports.getById = function (id, callback) {
  return Torrent.findById(id, callback)
}

module.exports.list = function (filter, callback) {
  let limit = 25
  let skip = 0
  let sort = {}

  if (filter.limit) { limit = filter.limit }

  if (filter.skip) { skip = filter.skip }

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

  if (filter.name) {
    query['name'] = {
      '$regex': util.format('.*%s.*', filter.name),
      '$options': 'i'
    }
  }

  if (filter.user_id) {
    query['user_id'] = {
      '$regex': util.format('.*%s.*', filter.user_id),
      '$options': 'i'
    }
  }

  if (filter.info_link) {
    query['info_link'] = {
      '$regex': util.format('.*%s.*', filter.info_link),
      '$options': 'i'
    }
  }

  if (filter.info_hash) {
    query['info_hash'] = filter.info_hash
  }

  if (filter.tag) {
    query['tag.name'] = filter.tag
  }

  if (filter.categories) {
    query['tag.categories'] = {
      '$in': filter.categories
    }
  }

  if (filter.audios) {
    query['audios'] = {
      '$in': filter.audios
    }
  }

  if (filter.subtitles) {
    query['subtitles'] = {
      '$in': filter.subtitles
    }
  }

  if (filter.kafa_from || filter.kafa_to) {
    let kafaQuery = {}
    if (filter.kafa_from) { kafaQuery['$gt'] = filter.kafa_from }
    if (filter.kafa_to) { kafaQuery['$lt'] = filter.kafa_to }
    query['kafa'] = kafaQuery
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

  return Torrent.find(query, callback).skip(skip).limit(limit).sort(sort)
}
