const express = require("express");
const WorkoutTask = require("../models/workouttask.model");
const {STATUS_CODES} = require("../../util/constants");
const {verifyToken} = require("../../util/auth");

const router = express.Router();

router.route("/get").post(verifyToken, async (req, res) => {
    try {
        const ptId = req.user.userId;
        const tasks = await WorkoutTask.find({pt: ptId});
        return res.status(STATUS_CODES.OK).send(tasks);
    } catch (err) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(err.message);
    }
});

router.route("/").put(verifyToken, async (req, res) => {
    try {
        const {title, clientId, description, duration, date} = req.body;
        const ptId = req.user.userId;

        // todo: verify that the pt has the clientId in their client list

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
