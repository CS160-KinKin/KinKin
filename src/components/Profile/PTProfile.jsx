import React from "react";
import './PTProfile.css';

function PTProfile(props) {
  return (
    <div className="card">

      <p className="name">
        <img className="image" src="blank-profile.png" alt="Profile" />
        {props.name}
      </p>
      
      {/* <hr size="1" width="100%" color="black" /> */}
      <div className="info">
        <h4>Bio</h4>
        <p>{props.bio}</p>
        <h4>Languages</h4>
        <p>{props.languages.join(', ')}</p>
        <h4>Specialites</h4>
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