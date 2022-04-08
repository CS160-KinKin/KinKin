const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutTaskSchema = new Schema(
  {
    title: { type: String, trim: true, required: true },
    client: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const WorkoutTask = mongoose.model("WorkoutTask", workoutTaskSchema);

module.exports = WorkoutTask;