import React from "react";

function PTProfile() {
  return (
    <div class="card">
      <p>
        <img src="blank-profile.png" alt="Profile Picture" width="100" />
        PT Name
      </p>
      <hr size="1" width="100%" color="black" />
      <h4>Bio</h4>
      <p>This is my bio.</p>
      <h4>Specialites</h4>
      <p>tag tag tag</p>
      <h4>Training Style</h4>
      <p>Description of training style.</p>
      <h4>Pricing</h4>
      <p>$100-200/month</p>
      <h4>Working Hours</h4>
      <p>MWF 12pm-5pm</p>
    </div>
  );
}

export default PTProfile;