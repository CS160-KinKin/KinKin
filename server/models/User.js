const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    _id: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    publicName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    pictureUrl: {
      type: String,
    },
  },
  {
    _id: false,
    collection: 'User',
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
