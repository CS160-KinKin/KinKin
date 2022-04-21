import React from 'react';
import { Footer, Navigation } from './index';
import './home.css';

function Home(props) {
  return (
    <>
      <Navigation {...props} />
      <div className='home'>
        <div className='col-lg-5'>
          <h1 className='font-weight-light'>Welcome!</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
