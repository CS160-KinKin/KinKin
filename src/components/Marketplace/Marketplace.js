import React, { Component } from 'react';
import { Navigation, Footer } from '../index';
import PTProfile from '../Profile/PTProfile';
import FilterSearch from './FilterSearch';
import { getPTsByFilters } from '../../util/pt';
import { addRequest } from '../../util/pt';
import ChatButton from '../Chat/ChatButton' 
import './marketplace.css';

export default class Marketplace extends Component {
  constructor(props) {
    super(props);
    this.getMarketplace = this.getMarketplace.bind(this);

    // Setting up state
    this.state = {
      PTList: [],
    };
  }

  componentDidMount() {
    if (this.props.user.token) this.getMarketplace();
  }

  async sendRequest(pt_id) {
    try {
      const response = await addRequest(this.props.user.token, pt_id);
      alert('Request sent to PT.');
    } catch (err) {
      alert('Could not send request.');
      console.error(err.message);
    }
  }
  
  async getMarketplace(filters = {}) {
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
        <Navigation {...this.props} />
        <div className='content marketplace'>
          <div className='row align-items-center my-5'>
            <div className='col-lg-5'>
              <FilterSearch
                user={this.props.user}
                getMarketplace={this.getMarketplace}
              />
              <br />
              <h4> List of suggested PT's for you:</h4>
              <div className="pt-cards">
                  {this.state.PTList.map((PT) => {
                    if (PT.id !== this.props.user.id)
                      return (
                        <div>
                          <PTProfile {...PT} />
                          <div className='buttons'> 
                            <button className='request-btn' onClick={() => this.sendRequest(PT.id)}>
                              Request
                            </button>
                            <ChatButton user={this.props.user} pt={PT} />
                          </div>
                          <br />
                          <br />
                        </div>
                      );
                    return <></>;
                  })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
