import React, { Component } from "react";
import { Navigation } from "../index";
import PTProfile from "../Profile/PTProfile";
import FilterSearch from "./FilterSearch";
import { getPTsByFilters } from "../../util/pt";
import { addRequest } from "../../util/pt";

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

  async sendRequest(pt_id) {
    try {
      const response = await addRequest(this.props.user.token, pt_id);
      alert("Request sent to PT.");
    }
    catch (err) {
      console.log(err.message);
    }
    
  }

  sendMessage() {
    alert("Request sent to PT.");
    // Message routing to be implemented
  }

  onChangeAvailability(e) {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    this.setState({
      availabilityFilter: value,
    });
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
              <FilterSearch user={this.props.user} getMarketplace /><br />
              <h4> List of suggested PT's for you:</h4>
              {this.state.PTList.map((PT) => {
                return (<div>
                  <PTProfile {...PT} />
                  <button onClick={() => this.sendRequest(PT.id)}>Request</button>
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