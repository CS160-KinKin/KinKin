import React, { useState, useEffect } from 'react';
import RequestComponent from './RequestComponent';
import { Footer, Navigation } from '../index';

const Request = (props) => {
  const FirstName = 'FirstName';
  const LastName = 'LastName';

  return (
    <>
      <Navigation {...props} />
      <div className='row content'>
        {/* NEED TO CONDITIONALLY RENDER THESE COMPONENTS */}
        {/* Fetch from DB: This user's list of requests, should return the names of those client users which we can render */}
        {/* OnClick method on pt page should send the name of the client to the DB */}
        <RequestComponent FirstName={FirstName} LastName={LastName} />
        <RequestComponent FirstName={FirstName} LastName={LastName} />
        <RequestComponent FirstName={FirstName} LastName={LastName} />
        <RequestComponent FirstName={FirstName} LastName={LastName} />
        <RequestComponent FirstName={FirstName} LastName={LastName} />
        <RequestComponent FirstName={FirstName} LastName={LastName} />
        <RequestComponent FirstName={FirstName} LastName={LastName} />
        <RequestComponent FirstName={FirstName} LastName={LastName} />
        <RequestComponent FirstName={FirstName} LastName={LastName} />
        <RequestComponent FirstName={FirstName} LastName={LastName} />
        <RequestComponent FirstName={FirstName} LastName={LastName} />
        <RequestComponent FirstName={FirstName} LastName={LastName} />
      </div>
      <Footer />
    </>
  );
};

export default Request;
