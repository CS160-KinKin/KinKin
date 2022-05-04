import React, { useState, useEffect } from 'react';
import RequestComponent from './RequestComponent';
import { Footer, Navigation } from '../index';
import { getRequests } from '../../util/pt';
import { acceptRequest } from '../../util/pt';

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
      <Navigation {...props} />
      <div className='row content'>
        {requests.map((request) => (
          <RequestComponent user={props.user} client={request} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Request;
