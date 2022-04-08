    const router = require("express").Router();
    let WorkoutTask = require("../models/workouttask.model");

router.route("/").get((req, res) => {
        console.log("hi there");
        WorkoutTask.find()
            .then((tasks) => res.json(tasks))
            .catch((err) => res.status(400).json("Error: " + err));
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
        .then(() => res.json("Workout Task added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    });

    router.route("/:id").get((req, res) => {
    WorkoutTask.findById(req.params.id)
        .then((WorkoutTask) => res.json(WorkoutTask))
        .catch((err) => res.status(400).json("Error: " + err));
    });

    router.route("/:id").delete((req, res) => {
    WorkoutTask.findByIdAndDelete(req.params.id)
        .then(() => res.json("Workout Task deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
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
                .then(() => res.json("Workout Task updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    });

    module.exports = router;
