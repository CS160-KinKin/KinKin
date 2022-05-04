import axios from 'axios';
import { CREATE_HEALTH_DATA_ENDPOINT, GET_WEEKLY_HEALTH_DATA_ENDPOINT, GET_MONTHLY_HEALTH_DATA_ENDPOINT, GET_DAILY_HEALTH_DATA_ENDPOINT } from './constants';

const createHealthData = async (token, calories, distanceWalked, distanceRan, distanceCycled, minutes) => {
  const res = await axios.post(
    process.env.REACT_APP_CONTROL_SERVER_URL + CREATE_HEALTH_DATA_ENDPOINT,
    { calories, distanceWalked, distanceRan, distanceCycled, minutes },
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

const getDailyHealth = async (token) => {
  const res = await axios.post(
    process.env.REACT_APP_CONTROL_SERVER_URL + GET_DAILY_HEALTH_DATA_ENDPOINT,
    { },
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

const getWeeklyHealth = async (token) => {
  const res = await axios.post(
    process.env.REACT_APP_CONTROL_SERVER_URL + GET_WEEKLY_HEALTH_DATA_ENDPOINT,
    { },
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

const getMonthlyHealth = async (token) => {
  const res = await axios.post(
    process.env.REACT_APP_CONTROL_SERVER_URL + GET_MONTHLY_HEALTH_DATA_ENDPOINT,
    { },
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

export {
  createHealthData,
  getWeeklyHealth,
  getMonthlyHealth,
  getDailyHealth
};