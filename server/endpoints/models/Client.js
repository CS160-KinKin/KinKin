const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
      type: String,
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
      ref: 'PT',
    },
    requests: {
      type: Array,
      of: String,
      ref: 'PT',
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
