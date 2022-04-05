import React from "react";

function ClientProfile() {
  return (
    <div class="card">
      <p>
        <img src="blank-profile.png" alt="Profile Picture" width="100" />
        Client Name
      </p>
      <hr size="1" width="100%" color="black" />
      <h4>Bio</h4>
      <p>This is my bio.</p>
      <h4>Interests</h4>
      <p>I have interests.</p>
    </div>
  );
}

export default ClientProfile;