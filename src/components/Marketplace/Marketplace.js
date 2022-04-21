import React, { Component } from "react";
import { Navigation } from "../index";
import PTProfile from "../Profile/PTProfile";
import FilterSearch from "./FilterSearch";
import axios from "axios";
import { getPTsByFilters } from "../../util/pt";

export default class Marketplace extends Component {
  constructor(props) {
    super(props);

    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    //this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeMaxDistance = this.onChangeMaxDistance.bind(this);
    this.onChangeSpecialty = this.onChangeSpecialty.bind(this);
    this.onChangeMinRate = this.onChangeMinRate.bind(this);
    this.onChangeMaxRate = this.onChangeMaxRate.bind(this);
    this.onChangeAvailability = this.onChangeAvailability.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getMarketplace = this.getMarketplace.bind(this);

    // Setting up state
    this.state = {
      PTList: [],
      languageFilter: null,
      //locationFilter: null,
      maxDistance: null,
      specialtyFilter: null,
      minRateFilter: null,
      maxRateFilter: null,
      availabilityFilter: null
    }
  }

  componentDidMount() {
    this.getMarketplace();
  }

  sendRequest() {
    alert("Request sent to PT.");
    // Request routing to be implemented
  }

  sendMessage() {
    alert("Request sent to PT.");
    // Message routing to be implemented
  }

  onChangeLanguage(e) {
    this.setState({
      languageFilter: e.target.value,
    });
  }

  /*onChangeLocation(e) {
      this.setState({
          location: e.target.value,
      });
  }*/

  onChangeMaxDistance(e) {
    this.setState({
      maxDistance: e.target.value,
    });
  }

  onChangeSpecialty(e) {
    this.setState({
      specialtyFilter: e.target.value,
    });
  }

  onChangeMinRate(e) {
    this.setState({
      minRateFilter: e.target.value,
    });
  }

  onChangeMaxRate(e) {
    this.setState({
      maxRateFilter: e.target.value,
    });
  }

  onChangeAvailability(e) {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    this.setState({
      availabilityFilter: value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const searchFilters = {
      languageFilter: this.state.language,
      //location: this.state.location,
      maxDistance: this.state.maxDistance,
      specialtyFilter: this.state.specialty,
      minRateFilter: this.state.minRate,
      maxRateFilter: this.state.maxRate,
      availabilityFilter: this.state.availability,
    };
  }

  async getMarketplace() {
    // get PT data from database using filters
    console.log(this.props.user);
    try {
      const list = await getPTsByFilters(this.props.user.token, {
        language: this.languageFilter,
        location: this.props.user.location,
        maxDistance: this.maxDistance,
        specialty: this.specialtyFilter,
        minRate: this.minRateFilter,
        maxRate: this.maxRateFilter,
        availableTimes: this.availabilityFilter
      });
      this.setState({ PTList: list });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    return (
      <>
        <Navigation />
        <div className="container">
          <div className="row align-items-center my-5">
            <div className="col-lg-5">
              <h1 className="font-weight-light">Marketplace</h1>
              <FilterSearch /><br />
              <h4> List of suggested PT's for you:</h4>
              {this.state.PTList.map((PT) => {
                return (<div>
                  <PTProfile {...PT} />
                  <button onClick={this.sendRequest}>Request</button>
                  <button onClick={this.sendMessage}>Message</button>
                  <br /><br />
                </div>)
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}