import React from 'react';
import { Footer, Navigation } from './index';
import './home.css';

function Home(props) {
  return (
    <>
      <Navigation {...props} />
      <div className='home row content'>
        <div className='container'>
          <div className='row align-items-center my-5'>
            <div className='col-lg-5'>
              <h1 className='font-weight-light'>Welcome!</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
