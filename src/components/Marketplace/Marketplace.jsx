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
              <h1 class="font-weight-light">Marketplace</h1>
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