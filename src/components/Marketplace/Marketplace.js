import React, { Component } from "react";
import { Navigation } from "../index";
import PTProfile from "../Profile/PTProfile";
import FilterSearch from "./FilterSearch";
import { getPTsByFilters } from "../../util/pt";

export default class Marketplace extends Component {
  constructor(props) {
    super(props);
    this.getMarketplace = this.getMarketplace.bind(this);

    // Setting up state
    this.state = {
      PTList: [],
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

  async getMarketplace(filters={}) {
    // get PT data from database using filters
    try {
      const list = await getPTsByFilters(this.props.user.token, filters);
      this.setState({ PTList: list });
    } catch (err) {
      console.error(err.message);
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
              <FilterSearch user={this.props.user} getMarketplace={this.getMarketplace} /><br />
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