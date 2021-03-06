import axios from 'axios';
import {
  CONVERT,
  USER_ATTRIBUTES,
  POST_LOGOUT_ENDPOINT,
  POST_AUTH_ENDPOINT,
} from './constants';
import Cookies from 'js-cookie';

const cookies = Cookies.withAttributes({
  expires: CONVERT.WEEK_TO_SECONDS,
  domain: process.env.REACT_APP_DOMAIN,
  sameSite: 'strict',
});

const authUrl = process.env.REACT_APP_CONTROL_SERVER_URL + POST_AUTH_ENDPOINT;
const logoutUrl =
  process.env.REACT_APP_CONTROL_SERVER_URL + POST_LOGOUT_ENDPOINT;

export default class User {
  constructor(attributes = {}) {
    USER_ATTRIBUTES.forEach((att) => {
      if (attributes[att]) {
        this[att] = attributes[att];
        cookies.set(att, attributes[att]);
      } else if (att !== 'newUser') {
        this[att] = cookies.get(att);
      }
    });
  }

  logout() {
    USER_ATTRIBUTES.forEach((att) => cookies.remove(att));
    fetch(logoutUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'x-access-token': this.token,
        'Content-Type': 'application/json',
      },
    });
  }

  async login(googleTokenId) {
    const res = await axios.post(
      authUrl,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': googleTokenId,
        },
      }
    );
    Object.assign(this, res.data);
    USER_ATTRIBUTES.forEach((att) => {
      if (att !== 'newUser') cookies.set(att, res.data[att]);
    });
  }
}
