const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
      type: String,
    },
    clients: {
      type: Array,
      of: String,
      ref: 'User',
    },
    requests: {
      type: Array,
      of: String,
      ref: 'Pt',
    },
    specialties: {
      type: Array,
      of: String,
    },
    rate: {
      type: Number,
    },
    availableTimes: {
      type: Array, // todo
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
