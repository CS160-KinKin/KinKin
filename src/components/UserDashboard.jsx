import React from 'react';
import { Navigation, Footer } from './index';

function UserDashboard(props) {
  return (
    <>
      <Navigation {...props} />
      <div className='row content'>
        <div className='container'>
          <p className='text-center'>Fill in later</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserDashboard;
