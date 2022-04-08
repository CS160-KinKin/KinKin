import {STATUS_CODES, GET_USER_INFO_ENDPOINT} from "./constants";

const getUserInfoUrl = process.env.REACT_APP_CONTROL_SERVER_URL + GET_USER_INFO_ENDPOINT;

export default class User {
  async fetchInfo(googleTokenId) {
    const res = await fetch(getUserInfoUrl, {
      method: "POST",
      mode: 'cors',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({tokenId: googleTokenId})
    });
    if (res.ok) {
      const data = await res.json();
      Object.assign(this, data);
    } else if (res.statusText === "Email not verified with Google") {
      console.log("block 1");
    } else {
      console.log("invalid login")
    }
  }
}