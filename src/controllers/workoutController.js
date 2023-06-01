// In src/controllers/workoutController.js
const workoutService = require("../services/workoutService");

const getAllWorkouts = (req, res) => {
  // *** ADD ***
  const { mode } = req.query;
  try {
    // *** ADD ***
    const allWorkouts = workoutService.getAllWorkouts({ mode });
    res.send({ status: "OK", data: allWorkouts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneWorkout = (req, res) => {
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
        const workout = workoutService.getOneWorkout(workoutId);
        res.send({ status: "OK", data: workout });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewWorkout = (req, res) => {
  const { body } = req;
  const requiredKeys = ['name', 'mode', 'equipment', 'exercises', 'trainerTips'];
  const missingKeys = requiredKeys.filter(key => !body[key]);

  if (missingKeys.length > 0) {
    res.status(400).send({
        status: 'FAILED',
        data: {
        error: `One or more of the following keys is missing or empty in the request body: ${missingKeys.join(', ')}`,
        },
    });
    return;
  }

  const newWorkout = {};
  requiredKeys.forEach(key => {
    newWorkout[key] = body[key];
  });

  try {
    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({ status: "OK", data: createdWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneWorkout = (req, res) => {
    const {
      body,
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
      const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
      res.send({ status: "OK", data: updatedWorkout });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteOneWorkout = (req, res) => {
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
      workoutService.deleteOneWorkout(workoutId);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
  };