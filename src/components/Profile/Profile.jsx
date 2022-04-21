import React from "react";
import ClientProfile from "./ClientProfile";
import PTProfile from "./PTProfile";
import {Navigation} from "../index";
import EditClient from "./EditClient";
import EditPT from "./EditPT";

function Profile(props) {
  return (
    <div className="profile">
      <Navigation {...props} />
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
            <ClientProfile 
              name={props.user.name} 
              bio={props.user.bio} 
              interests={props.user.interests} 
            /><br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;