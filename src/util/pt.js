import axios from 'axios';
import { SEARCH_PT_ENDPOINT } from './constants';
import { ADD_PTREQUEST_ENDPOINT } from './constants';
import { ADD_CLIENT_REQUEST_ENDPOINT } from './constants';
import { GET_REQUESTS_ENDPOINT } from './constants';
import { ACCEPT_REQUEST_ENDPOINT } from './constants';
import { DELETE_REQUEST_ENDPOINT } from './constants';

/**
 * Queries PTs based on filters.
 * @param {string} token JWT.
 * @returns [Promise<any>] All PTs that match the filters.
 */
 const getPTsByFilters = async (token, filters) => {
    const res = await axios.post(
      process.env.REACT_APP_CONTROL_SERVER_URL + SEARCH_PT_ENDPOINT,
      { params: filters },
      { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
    );
    return res.data;
  };

  // Query to add the PT to the client's request array and add the client to the PT's request array
const addRequest = async (token, pt_id) => {

    const res = await axios.post(
        process.env.REACT_APP_CONTROL_SERVER_URL + ADD_PTREQUEST_ENDPOINT,
        { pt_id },
        { headers: { 'x-access-token': token, 'content-type': 'application/json' } } 
    );

    const res2 = await axios.post(
        process.env.REACT_APP_CONTROL_SERVER_URL + ADD_CLIENT_REQUEST_ENDPOINT,
        { pt_id },
        { headers: { 'x-access-token': token, 'content-type': 'application/json' } } 
    );
    return res.data;
    
}

const getRequests = async (token) => {
    const res = await axios.post(
        process.env.REACT_APP_CONTROL_SERVER_URL + GET_REQUESTS_ENDPOINT,
        {},
        { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
    );
    return res.data;
}

const acceptRequest = async (token, name) => {
    const res = await axios.post(
        process.env.REACT_APP_CONTROL_SERVER_URL + ACCEPT_REQUEST_ENDPOINT,
        { name },
        { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
    );
    return res.data;
}

const deleteRequest = async (token, name) => {
    const res = await axios.post(
        process.env.REACT_APP_CONTROL_SERVER_URL + DELETE_REQUEST_ENDPOINT,
        { name },
        { headers: { 'x-access-token': token, 'content-type': 'application/json' } }
    );
    return res.data;
}

export {
    getPTsByFilters,
    addRequest,
    getRequests,
    acceptRequest,
    deleteRequest
};