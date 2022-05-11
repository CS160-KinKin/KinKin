import axios from 'axios';
import { GET_CLIENT_ENDPOINT, MUTATE_CLIENT_ENDPOINT } from './constants';

const createClient = (token, body) => {
  if (body.location !== undefined && body.location.type !== 'Point') {
    delete body.location;
  }
  return axios
    .put(
      process.env.REACT_APP_CONTROL_SERVER_URL + MUTATE_CLIENT_ENDPOINT,
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

const editClient = (token, body) => {
  if (body.location !== undefined && body.location.type !== 'Point') {
    delete body.location;
  }
  return axios
    .post(
      process.env.REACT_APP_CONTROL_SERVER_URL + MUTATE_CLIENT_ENDPOINT,
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

/**
 * Queries the user's client profile.
 * @param {string} token JWT.
 * @returns [Promise<AxiosResponse>] Client profile of user, if it exists.
 */
const getClient = (token) => {
  return axios
    .post(
      process.env.REACT_APP_CONTROL_SERVER_URL + GET_CLIENT_ENDPOINT,
      {},
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

export { getClient, createClient, editClient };
