const express = require("express");
const WorkoutTask = require("../models/workouttask.model");
const {STATUS_CODES} = require("../../util/constants");
const {verifyToken} = require("../../util/auth");

const router = express.Router();

router.route("/").post(verifyToken, async (req, res) => {
    try {
        const ptId = req.user.userId;
        const tasks = await WorkoutTask.find({pt: {userId: ptId}});
        return res.status(STATUS_CODES.OK).send(tasks);
    } catch (err) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(err);
    }
});

router.route("/").put(verifyToken, async (req, res) => {
    try {
        const {title, clientId, description} = req.body;
        const duration = Number(req.body.duration);
        const date = new Date(req.body.date);
        const ptId = req.user.userId;
        // todo: verify that the pt has the clientId in their client list

        console.log(req.body);

        const newWorkoutTask = await WorkoutTask.create({
            title,
            client: {userId: clientId},
            pt: {userId: ptId},
            description,
            duration,
            date,
        });
        return res.status(STATUS_CODES.OK).send(newWorkoutTask);
    } catch (err) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(err);
    }
});

router.route("/").delete(verifyToken, async (req, res) => {
    try {
        const taskId = req.body.id;
        const ptId = req.user.userId;
        const res = await WorkoutTask.findOneAndDelete({pt: {userId: ptId}, _id: taskId});
        return res.status(STATUS_CODES.OK).send(res);
    } catch (err) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(err);
    }
});

router.route("/update").post(verifyToken, async (req, res) => {
    try {
        const taskId = req.body.id;
        const ptId = req.user.userId;
        const task = await WorkoutTask.findOne({pt: {userId: ptId}, _id: taskId});
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.duration = Number(req.body.duration) || task.duration;
        task.date = new Date(req.body.date) || task.date;
        await task.save();
        return res.status(STATUS_CODES.OK).send(task);
    } catch (err) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(err);
    }
});

module.exports = router;
