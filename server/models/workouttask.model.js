const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutTaskSchema = new Schema(
  {
    title: { type: String, trim: true, required: true },
    pt: { type: String, ref: 'User', required: true },
    client: { type: String, ref: 'User', required: true },
    description: { type: String, trim: true, required: true },
    duration: {
      type: Number,
      required: true,
      validate: {
        validator: (e) => Number.isInteger(e) && e > 0,
        message: '{VALUE} is not a positive integer value',
      },
    },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const WorkoutTask = mongoose.model('WorkoutTask', workoutTaskSchema);

module.exports = WorkoutTask;
