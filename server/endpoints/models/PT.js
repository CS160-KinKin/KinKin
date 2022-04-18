const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = new Schema({ 
    city: String, 
    state: String 
})

const PTSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  publicName: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  postiveRatingCount: {
    type: Integer
  },
  negativeRatingCount: {
    type: Integer
  },
  location: {
    type: Location
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
  specialties: String,
  rate: Double,
  availableTimes: Array,
  requests: Array
}, 
  {
    collection: 'PT'
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models && mongoose.models.PT
    ? mongoose.models.PT
    : mongoose.model('PT', PTSchema);