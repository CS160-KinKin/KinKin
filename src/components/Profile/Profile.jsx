import React from 'react';
import ClientProfile from './ClientProfile';
import PTProfile from './PTProfile';
import { Navigation, Footer } from '../index';
import EditClient from './EditClient';
import EditPT from './EditPT';

function Profile(props) {
  return (
    <>
      <Navigation {...props} />
      <div className='row content'>
        <div className='container'>
          <div className='row align-items-center my-5'>
            <div className='col-lg-5'>
              <h1 className='font-weight-light'>Profile</h1>
              This is an example card of the Client side profile.
              <ClientProfile
                name='Client Name'
                bio='Bio Description'
                interests='My Interests'
              />
              <br />
              This is an example card of the PT side profile.
              <PTProfile
                name='PT Name'
                bio='Bio Description'
                specialties='My Specialties'
                training='My Training Style'
                pricing='My Pricing'
                hours='My Hours'
              />
              <br />
              This is the edit page of the client profile.
              <EditClient />
              <br />
              This is the edit page of the PT profile.
              <EditPT />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
