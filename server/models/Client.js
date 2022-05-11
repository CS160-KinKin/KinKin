const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PointSchema = require('./Point');

const ClientSchema = new Schema(
  {
    _id: {
      type: String,
      ref: 'User',
    },
    languages: {
      type: Array,
      of: String,
      default: [],
    },
    bio: {
      type: String,
    },
    positiveRatingCount: {
      type: Number,
      default: 0,
      validate: {
        validator: (e) => Number.isInteger(e) && e >= 0,
        message: '{VALUE} is not a non-negative integer value',
      },
    },
    negativeRatingCount: {
      type: Number,
      default: 0,
      validate: {
        validator: (e) => Number.isInteger(e) && e >= 0,
        message: '{VALUE} is not a non-negative integer value',
      },
    },
    location: {
      type: PointSchema,
      index: '2dsphere',
    },
    interests: {
      type: Array,
      of: String,
      default: [],
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
      default: [],
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
