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
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">Profile</h1>
            This is an example card of the Client side profile.
            <ClientProfile name="Bob" bio="I am a client looking for a PT." interests="I am interested in cardio." /><br />
            This is an example card of the PT side profile.
            <PTProfile name="Steve" bio="I am a PT looking for clients." specialties="I have many specialties."
              training="I am very supportive and encouraging." pricing="$100" hours="MWF 12pm-5pm" /><br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;