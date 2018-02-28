const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Language Schema
const LanguageSchema = mongoose.Schema({
  audios:{
    type: [String]
  },
  subtitles:{
    type: [String]
  }
});

// Status Schema
const StatusSchema = mongoose.Schema({
  leechers:{
    type: Number,
    default: 0
  },
  seeders:{
    type: Number,
    default: 0
  }
});

// Comment Schema
const CommentSchema = mongoose.Schema({
  user_id:{
    type: String,
    required: true
  },
  text:{
    type: String,
    required: true
  },
  subcomment:{
    type: [CommentSchema]
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

// Tag Schema
const TagSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  categorie:{
    type: String,
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
  status:{
    type: StatusSchema
  },
  info_hash:{
      type: String,
      required: true
  },
  screens:{
      type: [String]
  },
  comments:{
    type: CommentSchema
  },
  tags:{
    type: CommentSchema,
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
  },
  deleted_at: {
    type: Date
  }
});

const Torrent = module.exports = mongoose.model('Torrent', TorrentSchema);
