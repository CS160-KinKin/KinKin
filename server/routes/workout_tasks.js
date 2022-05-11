const Pt = require('../models/Pt');
const express = require('express');
const WorkoutTask = require('../models/workouttask.model');
const User = require('../models/User');
const { verifyToken } = require('../util/auth');
const { OK, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } =
  require('../util/constants').STATUS_CODES;
const router = express.Router();

router.route('/get').post(verifyToken, async (req, res) => {
  try {
    const id = req.user.userId;
    const { taskId } = req.body;
    const pt_tasks = [];
    const client_tasks = [];
    for await (const task of WorkoutTask.find({
      $and: [{ pt: id }, taskId ? { _id: taskId } : {}],
    })) {
      task.pt = await User.findById(task.pt);
      task.client = await User.findById(task.client);
      pt_tasks.push(task);
    }
    for await (const task of WorkoutTask.find({
      $and: [{ client: id }, taskId ? { _id: taskId } : {}],
    })) {
      task.pt = await User.findById(task.pt);
      task.client = await User.findById(task.client);
      client_tasks.push(task);
    }
    return res.status(OK).send({ pt: pt_tasks, client: client_tasks });
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.route('/').put(verifyToken, async (req, res) => {
  try {
    const { title, client, description, duration, date } = req.body;
    const ptId = req.user.userId;

    const doc = await Pt.findById(ptId);

    if (!doc) {
      return res.status(NOT_FOUND).send();
    }
    if (doc.clients.indexOf(client) === -1) {
      return res.status(UNAUTHORIZED).send();
    }

    const task = await WorkoutTask.create({
      title,
      client,
      pt: ptId,
      description,
      duration,
      date,
    });
    return res.status(OK).send(task);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.route('/delete').post(verifyToken, async (req, res) => {
  try {
    const taskId = req.body.id;
    const ptId = req.user.userId;
    await WorkoutTask.findOneAndRemove({ pt: ptId, _id: taskId });
    return res.status(OK).send();
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.route('/').post(verifyToken, async (req, res) => {
  try {
    const taskId = req.body.id;
    const ptId = req.user.userId;
    const pt = await Pt.findById(ptId);
    const task = await WorkoutTask.findOne({ pt: ptId, _id: taskId });
    const clientId = req.body.client || task.client;
    if (pt.clients.indexOf(clientId) === -1) {
      return res.status(UNAUTHORIZED).send();
    }
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.duration = req.body.duration || task.duration;
    task.date = req.body.date || task.date;
    task.client = clientId;
    await task.save();
    return res.status(OK).send(task);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

module.exports = router;
