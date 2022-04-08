import React from "react";
import {Navigation} from "../index";
import PTProfile from "../Profile/PTProfile";

function Marketplace() {
    function sendRequest() {
        alert("Request sent to PT.");
    }

    function sendMessage() {
        alert("Request sent to PT.");
    }

    return (
      <div>
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
              <h1 className="font-weight-light">Marketplace</h1>
              <h4> List of suggested PT's for you:</h4>
              <PTProfile />
              <button onClick={sendRequest}>Request</button>
              <button onClick={sendMessage}>Message</button>
              <br /><br />
              <PTProfile />
              <button onClick={sendRequest}>Request</button>
              <button onClick={sendMessage}>Message</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Marketplace;