import React from "react";
import {Navigation} from "./index";

function Home() {
  return (
    <div className="home">
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
            <h1 className="font-weight-light">Home</h1>
            <p>
              This is the home page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
