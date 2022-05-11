import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestComponent from './RequestComponent';
import { Footer, Navigation } from '../index';
import ptUtil from '../../util/pt';
import clientUtil from '../../util/client';

const Request = (props) => {
  const { user, type } = props;
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getRequests =
      type === 'pt'
        ? ptUtil.getRequests
        : type === 'client'
        ? clientUtil.getRequests
        : () => {
            throw Error(`invalid type: ${type}`);
          };

    getRequests(user.token)
      .then((response) => setRequests(response))
      .catch((err) =>
        console.error(`Error in Request.useEffect: ${err.message}`)
      );
  }, [user.token, type]);

  return (
    <>
      <Navigation {...props} />
      {requests.map((request) => (
        <RequestComponent
          user={props.user}
          other={request}
          ptSide={type === 'pt'}
        />
      ))}
      <button className='btn btn-light' onClick={() => navigate(-1)}>
        Back
      </button>
      <Footer />
    </>
  );
};

export default Request;
