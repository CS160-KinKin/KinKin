import React from 'react';
import { Footer, Navigation } from './index';

function About(props) {
  return (
    <>
      <Navigation {...props} />
      <div className='content'>
        <div className='container'>
          <div className='row align-items-center my-5'>
            <div className='col-lg-5'>
              <h1 className='font-weight-light'>About</h1>
              <p>
                This is a project for CS 160 at SJSU. It was developed by Christina Ng, Eunice Oh, Joshua Lawson, Thi Bui, Isita Bagayatkar, Charlotte Zhuang, and Isabella Piziali.
                <br></br>
                KinKin aims to help people who would like to start working out find a personal trainer to guide them. It provides a marketplace for users to find personal trainers,
                the ability to request a personal trainer, and to receive custom made workouts on our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
