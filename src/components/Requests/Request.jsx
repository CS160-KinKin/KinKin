import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestComponent from './RequestComponent';
import { Footer, Navigation } from '../index';
import * as ptUtil from '../../util/pt';
import * as clientUtil from '../../util/client';

const Request = (props) => {
  const { user, type } = props;
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getRequests =
      type === 'PT'
        ? ptUtil.getRequests
        : type === 'CLIENT'
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
          ptSide={type === 'PT'}
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
