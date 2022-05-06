import axios from 'axios';
import { MUTATE_USER_ENDPOINT } from './constants';

const createUser = (token, body) => {
  return axios
    .put(
      process.env.REACT_APP_CONTROL_SERVER_URL + MUTATE_USER_ENDPOINT,
      body,
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

export { createUser };
