const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
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
    type: Number
  },
  negativeRatingCount: {
    type: Number
  },
  location: {
    type: String
  },
  interests: {
    type: Array,
    of: String
  },
  trainingGoals: {
    type: String
  },
  records: {
    type: Array // todo
  },
  requests: {
    type: Array,
    of: String,
    ref: "PT"
  }
}, 
  {
    collection: 'Client'
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models && mongoose.models.Client
    ? mongoose.models.Client
    : mongoose.model('Client', ClientSchema);

