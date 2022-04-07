import React from "react";

function PTProfile(props) {
  return (
    <div class="card">
      <p>
        <img src="blank-profile.png" alt="Profile Picture" width="100" />
        {props.name}
      </p>
      <hr size="1" width="100%" color="black" />
      <h4>Bio</h4>
      <p>{props.bio}</p>
      <h4>Specialites</h4>
      <p>{props.specialties}</p>
      <h4>Training Style</h4>
      <p>{props.training}</p>
      <h4>Pricing</h4>
      <p>{props.pricing}</p>
      <h4>Working Hours</h4>
      <p>{props.hours}</p>
    </div>
  );
}

export default PTProfile;