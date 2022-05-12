import axios from 'axios';
import {
  GET_CLIENT_ENDPOINT,
  MUTATE_CLIENT_ENDPOINT,
  CLIENT_MUTATE_REQUEST_ENDPOINT,
  CLIENT_GET_REQUESTS_ENDPOINT,
} from './constants';

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

/**
 * Queries the client profile.
 * @param {string} token JWT.
 * @param {string} id The client's ID.
 * @returns [Promise<AxiosResponse>] Client profile of user, if it exists.
 */
const getClientById = (token, id) => {
  return axios
    .post(
      process.env.REACT_APP_CONTROL_SERVER_URL + GET_CLIENT_ENDPOINT + '/' + id,
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

// Query to add the PT to the client's request array and add the client to the PT's request array
const addRequest = async (token, pt_id) => {
  const res = await axios.put(
    process.env.REACT_APP_CONTROL_SERVER_URL + CLIENT_MUTATE_REQUEST_ENDPOINT,
    { pt_id },
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );

  return res.data;
};

const getRequests = async (token) => {
  const res = await axios.post(
    process.env.REACT_APP_CONTROL_SERVER_URL + CLIENT_GET_REQUESTS_ENDPOINT,
    {},
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

const deleteRequest = async (token, id) => {
  const res = await axios.delete(
    process.env.REACT_APP_CONTROL_SERVER_URL + CLIENT_MUTATE_REQUEST_ENDPOINT,
    { id },
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

export {
  getClient,
  getClientById,
  createClient,
  editClient,
  addRequest,
  getRequests,
  deleteRequest,
};
