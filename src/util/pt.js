import axios from 'axios';
import { SEARCH_PT_ENDPOINT } from './constants';

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

export {
    getPTsByFilters,
};