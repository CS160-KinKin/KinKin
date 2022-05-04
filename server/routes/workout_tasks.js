const Client = require("../models/Client");
const express = require("express");
const WorkoutTask = require("../models/workouttask.model");
const {STATUS_CODES} = require("../util/constants");
const { verifyToken } = require("../util/auth");
const { OK, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, CONFLICT } =
require("../util/constants").STATUS_CODES;
const router = express.Router();

router.route("/get").post(verifyToken, async (req, res) => {
    try {
        const id = req.user.userId;
        const tasks = await WorkoutTask.find({ pt: id });
        const cli_tasks = await WorkoutTask.find({ client: id });
        return res.status(STATUS_CODES.OK).send({ pt: tasks , client: cli_tasks});
    } catch (err) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(err.message);
    }
});

router.route("/").put(verifyToken, async (req, res) => {
  try {
    const { title, clientId, description, duration, date } = req.body;
    const ptId = req.user.userId;

    const client = await Client.findById(clientId);

    if (client == null) {
      return res.status(STATUS_CODES.NOT_FOUND).send("Not a client");
    }

    const task = await WorkoutTask.create({
      title,
      client: clientId,
      pt: ptId,
      description,
      duration,
      date,
    });
    return res.status(STATUS_CODES.OK).send(task);
  } catch (err) {
    return res.status(STATUS_CODES.BAD_REQUEST).send(err.message);
  }
});

router.route("/").delete(verifyToken, async (req, res) => {
    try {
        const taskId = req.body.id;
        const ptId = req.user.userId;
        const task = await WorkoutTask.findOneAndDelete({pt : ptId, _id: taskId});
        return res.status(STATUS_CODES.OK).send(task);
    } catch (err) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(err.message);
    }
});

router.route("/").post(verifyToken, async (req, res) => {
    try {
        const taskId = req.body.id;
        const ptId = req.user.userId;
        const task = await WorkoutTask.findOne({pt: ptId, _id: taskId});
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.duration = req.body.duration || task.duration;
        task.date = req.body.date || task.date;
        await task.save();
        return res.status(STATUS_CODES.OK).send(task);
    } catch (err) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(err.message);
    }
});

module.exports = router;
