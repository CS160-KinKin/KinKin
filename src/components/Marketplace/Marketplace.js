import React, { Component } from "react";
import { Navigation } from "../index";
import PTProfile from "../Profile/PTProfile";
import axios from "axios";

export default class Marketplace extends Component {
  constructor(props) {
    super(props);

    // Setting up state
    this.state = {
      PTList: [1, 1, 1],
      languageFilter: null,
      locationFilter: null,
      specialtiesFilter: null,
      minRateFilter: null,
      maxRateFilter: null,
      availabilityFilter: null
    }
  }

  componentDidMount() {
    /*axios
      .get(process.env.REACT_APP_CONTROL_SERVER_URL + "/marketplace/filters")
      .then((response) => {
        this.setState({
          //PTList: this.getMarketplace,
          languageFilter: response.data.language,
          locationFilter: response.data.location,
          specialtiesFilter: response.data.specialties,
          minRateFilter: response.data.minRate,
          maxRateFilter: response.data.maxRate,
          availabilityFilter: response.data.availability
        });
      })
      .catch(function (error) {
        console.log(error);
      });*/
  }

  sendRequest() {
    alert("Request sent to PT.");
    // Request routing to be implemented
  }

  sendMessage() {
    alert("Request sent to PT.");
    // Message routing to be implemented
  }

  getMarketplace() {
    // get PT data from database using filters
    axios.post(process.env.REACT_APP_CONTROL_SERVER_URL + '/pt/search', {
      params: {
        language: this.languageFilter,
        location: this.locationFilter,
        specialties: this.specialtiesFilter,
        minRate: this.minRateFilter,
        maxRate: this.maxRateFilter,
        availableTimes: this.availabilityFilter
      }
    })
      .then(function (response) {
        console.log(response);
        this.setState({ PTList: response.data })
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
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

              {this.state.PTList.map((PT) => {
                return (<div>
                  <PTProfile />
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