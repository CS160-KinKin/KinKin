import React from 'react';
import { Navigation, Footer } from './index';

function NotFound(props) {
  return (
    <>
      <Navigation {...props} />
      <div className='container'>
        <div className='col-lg-5'>
          <h1 className='font-weight-light'>Page not found</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
