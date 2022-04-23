import React, { useState, useEffect } from 'react';
import RequestComponent from './RequestComponent';
import { Footer, Navigation } from '../index';
import { getRequests } from "../../util/pt";
import { acceptRequest } from "../../util/pt";

const Request = (props) => {
  
  const [requests, setRequests] = useState([]);

  const getTrainingRequests = async () => {
    try {
      const response = await getRequests(props.user.token);
      //console.log(response);
      setRequests(response);
    //   console.log(requests);
    }
    catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getTrainingRequests();
  });

  return (
    <>
      <Navigation {...props} />
      <div className='row content'>
        
      {requests.map((request, index) =>
            (<RequestComponent key={index} user={props.user} name={request} />))}
        
      </div>
      <Footer />
    </>
  );
};

export default Request;
