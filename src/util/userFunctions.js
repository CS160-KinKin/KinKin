import axios from 'axios';
import { MUTATE_USER_ENDPOINT, STATUS_CODES } from './constants'


const createUser = async (body) => {
  const res = await axios.put(
    process.env.REACT_APP_CONTROL_SERVER_URL + MUTATE_USER_ENDPOINT,
    body,
    {
      headers: {
        'x-access-token': body.token,
        'content-type': 'application/json',
      },
    }
  );
  return res;
};

export {
  createUser,
};
