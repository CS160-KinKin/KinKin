import React from "react";

function PTProfile(props) {
  return (
    <div className="card">
      <p>
        <img src="blank-profile.png" alt="Profile" width="100" />
        {props.name}
      </p>
      <hr size="1" width="100%" color="black" />
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
      <h4>Positive Rating Count</h4>
      <p>{props.positiveRatingCount}</p>
      <h4>Negative Rating Count</h4>
      <p>{props.negativeRatingCount}</p>
    </div>
  );
}

export default PTProfile;