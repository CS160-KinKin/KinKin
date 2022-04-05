import React from "react";
import ClientProfile from "./ClientProfile";
import {Navigation} from "./index";

function Profile() {
  return (
    <div className="profile">
      <Navigation />
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Profile</h1>
            <p>
              This is the client's profile page.
            </p>
            <ClientProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;