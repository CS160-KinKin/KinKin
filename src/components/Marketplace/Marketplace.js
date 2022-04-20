import React, { Component } from "react";
import { Navigation } from "../index";
import PTProfile from "../Profile/PTProfile";

export default class Marketplace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: [1, 2, 3],
      languageFilter: "",
      locationFilter: "",
      specialtiesFilter: "",
      rateFilter: 0,
      availabilityFilter: 0,
    }
  }

  sendRequest() {
    alert("Request sent to PT.");
  }

  sendMessage() {
    alert("Request sent to PT.");
  }

  getMarketplace() {
    // get PT data from database
    // use filters to
  }

  render() {
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
              {this.state.count.map((count, name) => {
                return (<div>
                  <PTProfile name="I am a PT" bio="I'm an excellent trainer" />
                  <button onClick={this.sendRequest}>Request</button>
                  <button onClick={this.sendMessage}>Message</button>
                  <br /><br />
                </div>)
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}