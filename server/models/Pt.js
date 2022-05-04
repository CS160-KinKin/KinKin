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
      type: PointSchema,
      index: '2dsphere',
    },
    clients: {
      type: Array,
      of: String,
      ref: 'User',
    },
    requests: {
      type: Array,
      of: String,
      ref: 'Client',
    },
    specialties: {
      type: Array,
      of: String,
    },
    rate: {
      type: Number,
    },
    availableDays: {
      type: Array,
      of: { 
        type: String, 
        required: true,
        enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] 
      },
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
