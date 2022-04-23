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

const authUrl =
  process.env.REACT_APP_CONTROL_SERVER_URL + POST_AUTH_ENDPOINT;
const logoutUrl =
  process.env.REACT_APP_CONTROL_SERVER_URL + POST_LOGOUT_ENDPOINT;

export default class User {
  constructor() {
    USER_ATTRIBUTES.forEach((att) => {
      this[att] = cookies.get(att);
    });
  }

  logout() {
    USER_ATTRIBUTES.forEach((att) => {
      cookies.remove(att, this[att]);
    });
    fetch(logoutUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'x-access-token': this.token,
        'Content-Type': 'application/json',
      },
    });
  }

  async fetchInfo(googleTokenId) {
    const res = await fetch(authUrl, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tokenId: googleTokenId }),
    });
    if (res.ok) {
      const data = await res.json();
      Object.assign(this, data);
      USER_ATTRIBUTES.forEach((att) => {
        cookies.set(att, data[att]);
      });
    } else if (res.statusText === 'Email not verified with Google') {
      console.log('block 1');
    } else {
      console.log('invalid login');
    }
  }
}
