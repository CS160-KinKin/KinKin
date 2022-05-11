const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PointSchema = require('./Point');

const PtSchema = new Schema(
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
    clients: {
      type: Array,
      of: String,
      ref: 'User',
      default: [],
    },
    requests: {
      type: Array,
      of: String,
      ref: 'Client',
      default: [],
    },
    specialties: {
      type: Array,
      of: String,
      default: [],
    },
    rate: {
      type: Number,
      validate: {
        validator: (e) => Number.isInteger(e) && e >= 0,
        message: '{VALUE} is not a non-negative integer value',
      },
    },
    availableDays: {
      type: Array,
      of: {
        type: String,
        required: true,
        enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      },
      default: [],
    },
  },
  {
    _id: false,
    collection: 'Pt',
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Pt', PtSchema);
