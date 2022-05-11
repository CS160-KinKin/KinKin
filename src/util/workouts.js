import axios from 'axios';
import {
  GET_WORKOUTS_ENDPOINT,
  MUTATE_WORKOUTS_ENDPOINT,
} from './constants';

/**
 * Queries workout tasks for a PT.
 * @param {string} token JWT.
 * @returns [Promise<any>] All tasks from this PT.
 */
const getWorkouts = async (token) => {
  const res = await axios.post(
    process.env.REACT_APP_CONTROL_SERVER_URL + GET_WORKOUTS_ENDPOINT,
    {},
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

/**
 * Deletes a workout task.
 * @param {string} token JWT of PT.
 * @param {string} taskId WorkoutTask._id
 * @returns Promise<any> The deleted WorkoutTask.
 */
const deleteWorkoutTask = async (token, taskId) => {
  const res = await axios.delete(
    process.env.REACT_APP_CONTROL_SERVER_URL + MUTATE_WORKOUTS_ENDPOINT,
    { id: taskId },
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

/**
 * Change a workout task.
 * @param {string} token JWT of PT.
 * @param {any} task WorkoutTask's new values. Updates whatever matches
 * task._id. Omit parameters to leave unchanged. task.ptId is ignored.
 * @returns Promise<any> The updated WorkoutTask.
 */
const updateWorkoutTask = async (token, task) => {
  const res = await axios.post(
    process.env.REACT_APP_CONTROL_SERVER_URL + MUTATE_WORKOUTS_ENDPOINT,
    task,
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

/**
 * Creates a new workout task.
 * @param {string} token JWT of PT.
 * @param {any} task task.ptId is ignored.
 * @returns {Promise<any>} The created workout task.
 */
const createWorkoutTask = async (token, task) => {
  const res = await axios.put(
    process.env.REACT_APP_CONTROL_SERVER_URL + MUTATE_WORKOUTS_ENDPOINT,
    task,
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

export {
  getWorkouts,
  deleteWorkoutTask,
  updateWorkoutTask,
  createWorkoutTask,
};
