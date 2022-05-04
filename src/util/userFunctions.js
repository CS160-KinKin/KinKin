import axios from 'axios';
import { MUTATE_USER_ENDPOINT } from './constants'


const createUser = async (token, body) => {
  const res = await axios.put(
    process.env.REACT_APP_CONTROL_SERVER_URL + MUTATE_USER_ENDPOINT,
    body,
    {
      headers: {
        'x-access-token': token,
        'content-type': 'application/json',
      },
    }
  );
  return res;
};

export {
  createUser,
};
