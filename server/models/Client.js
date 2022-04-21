const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pointSchema = require('./Point');

const ClientSchema = new Schema(
  {
    _id: {
      type: String,
      ref: 'User',
    },
    languages: {
      type: Array,
      of: String,
    },
    bio: {
      type: String,
    },
    positiveRatingCount: {
      type: Number,
    },
    negativeRatingCount: {
      type: Number,
    },
    location: {
      type: pointSchema,
    },
    interests: {
      type: Array,
      of: String,
    },
    trainingGoals: {
      type: String,
    },
    pt: {
      type: String,
      ref: 'Pt',
    },
    requests: {
      type: Array,
      of: String,
      ref: 'Pt',
    },
  },
  {
    _id: false,
    collection: 'Client',
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Client', ClientSchema);
