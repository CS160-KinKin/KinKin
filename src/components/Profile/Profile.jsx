import React from "react";
import ClientProfile from "./ClientProfile";
import PTProfile from "./PTProfile";
import {Navigation} from "../index";
import EditClient from "./EditClient";
import EditPT from "./EditPT";

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
            This is an example card of the Client side profile.
            <ClientProfile name="Client Name" bio="Bio Description" interests="My Interests" /><br />
            This is an example card of the PT side profile.
            <PTProfile name="PT Name" bio="Bio Description" specialties="My Specialties" training="My Training Style" pricing="My Pricing" hours="My Hours" /><br />
            This is the edit page of the client profile.
            <EditClient /><br />
            This is the edit page of the PT profile.
            <EditPT />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;