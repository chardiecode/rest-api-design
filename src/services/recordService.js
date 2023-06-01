// In src/services/recordService.js
const Record = require("../database/Record");

const getRecordForWorkout = (workoutId) => {
    try {
      const workout = Record.getRecordForWorkout(workoutId);
      return workout;
    } catch (error) {
      throw error;
    }
  };

module.exports = { getRecordForWorkout };