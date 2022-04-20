const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PTSchema = new Schema(
  {
    _id: {
      type: String,
      unique: true,
      required: true,
    },
    language: {
      type: String,
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
    requests: {
      type: Array,
      of: String,
      ref: 'PT',
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
    collection: 'PT',
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models && mongoose.models.PT
    ? mongoose.models.PT
    : mongoose.model('PT', PTSchema);
