const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  language: {
    type: String,
  },
  bio: {
    type: String,
  },
  postiveRatingCount: {
    type: Number
  },
  negativeRatingCount: {
    type: Number
  },
  location: {
    type: String
  },
  image: {
    data: Buffer, 
    contentType: String 
  },
  onlineStatus: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  interests: {
    type: Array
  },
  trainingGoals: {
    type: String
  },
  records: {
    type: Array
  },
  requests: Array
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

