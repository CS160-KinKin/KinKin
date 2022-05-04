import React, { Component } from 'react';
import { Navigation, Footer } from '../index';
import PTProfile from '../Profile/PtProfilePage';
import FilterSearch from './FilterSearch';
import { getPTsByFilters } from '../../util/pt';
import { addRequest } from '../../util/pt';

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
      console.log(err.message);
    }
  }

  sendMessage() {
    alert('Go to messaging tbd');
    // Message routing to be implemented
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
        <div className='container'>
          <div className='row align-items-center my-5'>
            <div className='col-lg-5'>
              <h1 className='font-weight-light'>Marketplace</h1>
              <FilterSearch
                user={this.props.user}
                getMarketplace={this.getMarketplace}
              />
              <br />
              <h4> List of suggested PT's for you:</h4>
              {this.state.PTList.map((Pt) => {
                if (Pt.id !== this.props.user.id)
                  return (
                    <div>
                      <PTProfile user={this.props.user} Pt />
                      <button onClick={() => this.sendRequest(Pt.id)}>
                        Request
                      </button>
                      <button onClick={this.sendMessage}>Message</button>
                      <br />
                      <br />
                    </div>
                  );
                return <></>;
              })}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
