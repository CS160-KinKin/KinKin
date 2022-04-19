import React from "react";
import {Navigation} from "./index";
import "./home.css"

function Home() {
  return (
    <div className="home">
      <Navigation />
      <div class="container">
        <div class="col-lg-5">
          <h1 class="font-weight-light">Welcome!</h1>
        </div> 
      </div>
    </div>
  );
}

export default Home;
