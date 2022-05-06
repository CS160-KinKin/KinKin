import React, { useState, useEffect } from 'react';
import RequestComponent from './RequestComponent';
import { getRequests } from '../../util/pt';

const Request = (props) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    try {
      getRequests(props.user.token).then((response) => setRequests(response));
    } catch (err) {
      console.error(err.message);
    }
  }, [props.user.token]);

  return (
    <>
      {requests.map((request) => (
        <RequestComponent user={props.user} client={request} />
      ))}
      <button onClick={props.back}>Back</button>
    </>
  );
};

export default Request;
