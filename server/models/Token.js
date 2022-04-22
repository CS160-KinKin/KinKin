const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
  {
    userId: {
      type: String,
      ref: 'User',
    },
  },
  {
    collection: 'Token',
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Token', TokenSchema);
