import React from 'react';
import { Footer, Navigation } from './index';
import './home.css';

function Home(props) {
  return (
    <>
      <Navigation {...props} />
      <div className='home row content'>
        
              <h1 className='welcome'>Welcome!</h1>
            
      </div>
      <Footer />
    </>
  );
}

export default Home;
