import axios from 'axios';
import { GET_CLIENT_ENDPOINT } from './constants';

/**
 * Queries the user's client profile.
 * @param {string} token JWT.
 * @returns [Promise<any>] Client profile of user, if it exists.
 */
 const getClient = async (token) => {
    const res = await axios.post(
      process.env.REACT_APP_CONTROL_SERVER_URL + GET_CLIENT_ENDPOINT,
      {},
      { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
    );
    return res.data;
  };

export {
    getClient,
};