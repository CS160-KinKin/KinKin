import axios from 'axios';
import {
  GET_PT_ENDPOINT,
  SEARCH_PT_ENDPOINT,
  PT_ACCEPT_REQUEST_ENDPOINT,
  PT_MUTATE_REQUEST_ENDPOINT,
  PT_GET_REQUESTS_ENDPOINT,
  MUTATE_PT_ENDPOINT,
} from './constants';

/**
 * Queries the user's PT profile.
 * @param {string} token JWT.
 * @returns [Promise<AxiosResponse>] status: OK, NOT_FOUND, or BAD_REQUEST;
 * data: client profile, if it exists
 */
const getPt = (token) => {
  return axios
    .post(
      process.env.REACT_APP_CONTROL_SERVER_URL + GET_PT_ENDPOINT,
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

const createPt = (token, body) => {
  if (body.rate !== undefined) {
    body.rate = parseInt(body.rate);
    if (isNaN(body.rate) || body.rate < 0) delete body.rate;
  }
  if (body.location !== undefined && body.location.type !== 'Point') {
    delete body.location;
  }
  return axios
    .put(process.env.REACT_APP_CONTROL_SERVER_URL + MUTATE_PT_ENDPOINT, body, {
      headers: {
        'x-access-token': token,
        'content-type': 'application/json',
      },
    })
    .catch((err) => {
      if (err.response) {
        return err.response;
      }
      throw err;
    });
};

const editPt = (token, body) => {
  if (body.rate) {
    body.rate = parseInt(body.rate);
    if (isNaN(body.rate) || body.rate < 0) delete body.rate;
  }
  if (body.location && body.location.type !== 'Point') {
    delete body.location;
  }
  return axios
    .post(process.env.REACT_APP_CONTROL_SERVER_URL + MUTATE_PT_ENDPOINT, body, {
      headers: {
        'x-access-token': token,
        'content-type': 'application/json',
      },
    })
    .catch((err) => {
      if (err.response) {
        return err.response;
      }
      throw err;
    });
};

/**
 * Queries PTs based on filters.
 * @param {string} token JWT.
 * @returns [Promise<any>] All PTs that match the filters.
 */
const getPTsByFilters = async (token, filters) => {
  const res = await axios.post(
    process.env.REACT_APP_CONTROL_SERVER_URL + SEARCH_PT_ENDPOINT,
    { query: filters },
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

const getRequests = async (token) => {
  const res = await axios.post(
    process.env.REACT_APP_CONTROL_SERVER_URL + PT_GET_REQUESTS_ENDPOINT,
    {},
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

const acceptRequest = async (token, id) => {
  const res = await axios.post(
    process.env.REACT_APP_CONTROL_SERVER_URL + PT_ACCEPT_REQUEST_ENDPOINT,
    { id },
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

const deleteRequest = async (token, id) => {
  const res = await axios.delete(
    process.env.REACT_APP_CONTROL_SERVER_URL + PT_MUTATE_REQUEST_ENDPOINT,
    { id },
    { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
  );
  return res.data;
};

export {
  getPt,
  createPt,
  editPt,
  getPTsByFilters,
  getRequests,
  acceptRequest,
  deleteRequest,
};
