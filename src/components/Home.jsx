import React from 'react';
import { Footer, Navigation } from './index';
import './home.css';

function Home(props) {
  return (
    <>
      <Navigation {...props} />
      <div className='home content'>
        <div className='container'>
          <div className='row align-items-center m-5'>
            <div className='col-lg-5'>
              <h1 className='font-weight-light'>Your kinesiology friend.</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
