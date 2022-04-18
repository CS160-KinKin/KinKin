import React from "react";

function ClientProfile(props) {
  return (
    <div className="card">
      <p>
        <img src="blank-profile.png" alt="Profile" width="100" />
        {props.name}
      </p>
      <hr size="1" width="100%" color="black" />
      <h4>Bio</h4>
      <p>{props.bio}</p>
      <h4>Interests</h4>
      <p>{props.interests}</p>
    </div>
  );
}

export default ClientProfile;