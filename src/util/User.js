import {STATUS_CODES, GET_USER_INFO_ROUTE} from "./constants";

export default class User {
  async fetchInfo(googleTokenId) {
    const res = await fetch(GET_USER_INFO_ROUTE, {
      method: 'GET',
      body: JSON.stringify({
        id_token: googleTokenId,
      }),
      headers: {
          'Content-Type': 'application/json',
      }
    });
    if (res.status !== STATUS_CODES.OK) {

    }
  }
}