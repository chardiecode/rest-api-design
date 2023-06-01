// In src/controllers/recordController.js
const recordService = require("../services/recordService");

const getRecordForWorkout = (req, res) => {
    try {
        const allWorkouts = recordService.getRecordForWorkout();
        res.send({ status: "OK", data: allWorkouts });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneRecordForWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req;
    if (!workoutId) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: { error: "Parameter ':workoutId' can not be empty" },
        });
    }
    try {
        const workout = recordService.getRecordForWorkout(workoutId);
        res.send({ status: "OK", data: workout });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getRecordForWorkout,
    getOneRecordForWorkout,
  };