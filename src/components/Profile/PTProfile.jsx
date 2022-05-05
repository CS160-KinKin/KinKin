import React from 'react';
import './PTProfile.css';

function PTProfile(props) {
  return (
    <div className='card'>
      <p className='name'>
        <img
          className='image'
          src={(props.user && props.user.pictureUrl) || 'blank-profile.png'}
          alt='Profile'
        />
        {props.name}
      </p>
      <div className='info'>
        <h4>Bio</h4>
        <p>{props.bio}</p>
        <h4>Languages</h4>
        <p>{props.languages.join(', ')}</p>
        <h4>Specialties</h4>
        <p>{props.specialties.join(', ')}</p>
        <h4>Rate</h4>
        <p>${props.rate}</p>
        <h4>Available Days</h4>
        <p>{props.availableDays.join(', ')}</p>
        <h4>Location</h4>
        <p>{props.location}</p>
      </div>
    </div>
  );
}

export default PTProfile;
