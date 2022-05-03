import axios from 'axios';
import { CREATE_HEALTH_DATA_ENDPOINT } from './constants';

const createHealthData = async (token, calories, distance, minutes) => {
    const res = await axios.post(
      process.env.REACT_APP_CONTROL_SERVER_URL + CREATE_HEALTH_DATA_ENDPOINT,
      { calories, distance, minutes },
      { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
    );
    return res.data;
  };

  export {
    createHealthData
};