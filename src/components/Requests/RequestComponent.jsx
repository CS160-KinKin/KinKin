import React from 'react';
import './requestcomponent.css';
import * as ptUtil from '../../util/pt';
import * as clientUtil from '../../util/client';

const RequestComponent = (props) => {
  const { user, other, ptSide } = props;

  const acceptRequest = ptSide
    ? ptUtil.acceptRequest
    : () => {
        throw Error('Only the PT can accept the request.');
      };
  const deleteRequest = ptSide
    ? ptUtil.deleteRequest
    : clientUtil.deleteRequest;

  const handleAcceptRequest = () => {
    acceptRequest(user.token, other.id)
      .then(() => alert('Request accepted'))
      .catch((err) =>
        console.error(
          `RequestComponent.handleAcceptRequest had an error: ${err.message}`
        )
      );
  };

  const handleRejectRequest = async () => {
    deleteRequest(user.token, other.id)
      .then(() => alert('Request deleted'))
      .catch((err) =>
        console.error(
          `RequestComponent.handleDeleteRequest had an error: ${err.message}`
        )
      );
  };

  return (
    <div className='request-container'>
      <div className='other-name'>
        <h1>{props.other.name || 'No name'}</h1>
      </div>
      <div className='buttons'>
        {ptSide ? (
          <>
            <button
              type='button'
              className='accept-btn'
              onClick={handleAcceptRequest}
            >
              Accept
            </button>
            <button
              type='button'
              className='reject-btn'
              onClick={handleRejectRequest}
            >
              Reject
            </button>
          </>
        ) : (
          <button
            type='button'
            className='reject-btn'
            onClick={handleRejectRequest}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestComponent;
