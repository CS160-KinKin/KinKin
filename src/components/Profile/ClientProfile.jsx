import React from 'react';
import './Profile.css';

function ClientProfile(props) {
  return (
    <div className='card'>
      <p className='name'>
        <img
          className='image'
          src={props.pictureUrl || 'blank-profile.png'}
          alt='Profile'
        />
        {props.name ? props.name : 'no name'}
      </p>
      <div className='info'>
        <h4>Bio</h4>
        <p>{props.bio || ''}</p>
        <h4>Languages</h4>
        <p>{props.languages ? props.languages.join(', ') : ''}</p>
        <h4>Interests</h4>
        <p>{props.interests ? props.interests.join(', ') : ''}</p>
        <h4>Location</h4>
        <p>{/* todo */}</p>
      </div>
    </div>
  );
}

export default ClientProfile;
