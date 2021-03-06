const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const HealthDataSchema = new Schema(
  {
    client_id: {
      type: String,
      ref: 'User',
      required: true,
    },
    calories: {
      type: Number,
      required: true
    },
    distanceWalked: {
      type: Number,
      required: true
    },
    distanceRan: {
      type: Number,
      required: true
    },
    distanceCycled: {
      type: Number,
      required: true
    },
    minutes: {
      type: Number,
      required: true
    },
    date: { type: Date, default: Date.now() }
  },
  {
    collection: 'HealthData',
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('HealthData', HealthDataSchema);

