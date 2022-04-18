const express = require("express");
const WorkoutTask = require("../models/workouttask.model");
const {STATUS_CODES} = require("../../util/constants");

const router = express.Router();

router.route("/").get((req, res) => {
    WorkoutTask.find()
        .then((tasks) => res.status(STATUS_CODES.OK).json(tasks))
        .catch((err) => res.status(STATUS_CODES.BAD_REQUEST).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const title = req.body.title;
    const client = req.body.client;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newWorkoutTask = new WorkoutTask({
        title,
        client,
        description,
        duration,
        date,
    });

    newWorkoutTask
        .save()
        .then(() => res.status(STATUS_CODES.OK).json("Workout Task added!"))
        .catch((err) => res.status(STATUS_CODES.BAD_REQUEST).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    WorkoutTask.findById(req.params.id)
        .then((WorkoutTask) => res.status(STATUS_CODES.OK).json(WorkoutTask))
        .catch((err) => res.status(STATUS_CODES.BAD_REQUEST).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    WorkoutTask.findByIdAndDelete(req.params.id)
        .then(() => res.status(STATUS_CODES.OK).json("Workout Task deleted."))
        .catch((err) => res.status(STATUS_CODES.BAD_REQUEST).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    WorkoutTask.findById(req.params.id)
        .then((task) => {
            task.title = req.body.title;
            task.client = req.body.client;
            task.description = req.body.description;
            task.duration = Number(req.body.duration);
            task.date = Date.parse(req.body.date);

            task
                .save()
                .then(() => res.status(STATUS_CODES.OK).json("Workout Task updated!"))
                .catch((err) => res.status(STATUS_CODES.BAD_REQUEST).json("Error: " + err));
        })
        .catch((err) => res.status(STATUS_CODES.BAD_REQUEST).json("Error: " + err));
});

module.exports = router;
