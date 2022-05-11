import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestComponent from './RequestComponent';
import { Footer, Navigation } from '../index';
import { getRequests } from '../../util/pt';

const Request = (props) => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

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
      {requests.map((request) => (
        <RequestComponent user={props.user} client={request} />
      ))}
      <button className='btn btn-light' onClick={() => navigate(-1)}>
        Back
      </button>
      <Footer />
    </>
  );
};

export default Request;
