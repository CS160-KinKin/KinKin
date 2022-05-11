import axios from 'axios';
import { GET_WORKOUTS_ENDPOINT, MUTATE_WORKOUTS_ENDPOINT } from './constants';

/**
 * Queries workout tasks for a PT.
 * @param {string} token JWT.
 * @returns Promise<AxiosResponse<any, any>> Array of tasks from this PT.
 */
const getWorkouts = (token, filter = {}) => {
  return axios
    .post(
      process.env.REACT_APP_CONTROL_SERVER_URL + GET_WORKOUTS_ENDPOINT,
      filter,
      {
        headers: {
          'x-access-token': token,
          'content-type': 'application/json',
        },
      }
    )
    .catch((err) => {
      if (err.response) {
        return err.response;
      }
      throw err;
    });
};

/**
 * Deletes a workout task.
 * @param {string} token JWT of PT.
 * @param {string} taskId WorkoutTask._id
 * @returns Promise<AxiosResponse<any, any>> The deleted WorkoutTask.
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
 * @returns Promise<AxiosResponse<any, any>> The updated WorkoutTask.
 */
const updateWorkoutTask = (token, task) => {
  task.duration = parseInt(task.duration);
  return axios
    .post(
      process.env.REACT_APP_CONTROL_SERVER_URL + MUTATE_WORKOUTS_ENDPOINT,
      task,
      {
        headers: {
          'x-access-token': token,
          'content-type': 'application/json',
        },
      }
    )
    .catch((err) => {
      if (err.response) {
        return err.response;
      }
      throw err;
    });
};

/**
 * Creates a new workout task.
 * @param {string} token JWT of PT.
 * @param {any} task task.ptId is ignored.
 * @returns {Promise<AxiosResponse<any, any>>} The created workout task.
 */
const createWorkoutTask = async (token, task) => {
  return axios
    .put(
      process.env.REACT_APP_CONTROL_SERVER_URL + MUTATE_WORKOUTS_ENDPOINT,
      task,
      {
        headers: {
          'x-access-token': token,
          'content-type': 'application/json',
        },
      }
    )
    .catch((err) => {
      if (err.response) {
        return err.response;
      }
      throw err;
    });
};

export { getWorkouts, deleteWorkoutTask, updateWorkoutTask, createWorkoutTask };
