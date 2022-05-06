import React, { Component } from 'react';
import Select from 'react-select';
import { getClient } from '../../util/client';
import { DAYS_OF_WEEK } from '../../util/constants';
import './filtersearch.css';

export default class FilterSearch extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    //this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeMaxDistance = this.onChangeMaxDistance.bind(this);
    this.onChangeSpecialty = this.onChangeSpecialty.bind(this);
    this.onChangeMinRate = this.onChangeMinRate.bind(this);
    this.onChangeMaxRate = this.onChangeMaxRate.bind(this);
    this.onChangeAvailability = this.onChangeAvailability.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      language: '',
      location: null,
      maxDistance: '',
      specialty: '',
      minRate: '',
      maxRate: '',
      availability: [],
    };
  }

  async componentDidMount() {
    //const client = await getClient(this.props.user.token);
    //this.setState({ location: client.location });
  }

  onChangeLanguage(e) {
    this.setState({
      language: e.target.value,
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
      specialty: e.target.value,
    });
  }

  onChangeMinRate(e) {
    this.setState({
      minRate: e.target.value,
    });
  }

  onChangeMaxRate(e) {
    this.setState({
      maxRate: e.target.value,
    });
  }

  onChangeAvailability(value) {
    this.setState({
      availability: value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const filters = {};
    if (this.state.language.length) filters.language = this.state.language;
    if (this.state.location) filters.location = this.state.location;
    if (this.state.specialty) filters.specialty = this.state.specialty;
    if (Number.isFinite(this.state.maxDistance)) {
      filters.maxDistance = this.state.maxDistance * 1000;
    }
    if (Number.isFinite(this.state.minRate)) {
      filters.minRate = this.state.minRate;
    }
    if (Number.isFinite(this.state.maxRate)) {
      filters.maxRate = this.state.maxRate;
    }
    if (this.state.availability.length) {
      filters.availability = this.state.availability.map((e) => e.value);
    }
    this.props.getMarketplace(filters);
  }

  render() {
    return (
      <>
      <div className='filters-container'>
        <h4>PT Search Filters</h4>
        <form onSubmit={this.onSubmit}>
          <div className='wrapper'>
            <label>Select a language: </label>
            <select value={this.state.language} onChange={this.onChangeLanguage}>
              <option value='' defaultChecked={true}>
                Any
              </option>
              <option value='english'>English</option>
              <option value='french'>French</option>
              <option value='german'>German</option>
              <option value='japanese'>Japanese</option>
              <option value='mandarin'>Mandarin</option>
              <option value='spanish'>Spanish</option>
            </select>
            <br />
          </div>

          <div className='wrapper'>
          <label>Maximum Distance (km): </label>
          <input
            type='number'
            value={this.state.maxDistance}
            onChange={this.onChangeMaxDistance}
          />
          </div>
          <br />

          <div className='wrapper'>
            <label>Specialty: </label>
            <input
              type='text'
              value={this.state.specialty}
              onChange={this.onChangeSpecialty}
            />

          </div>      
          <br />

          <div className='wrapper'>
          <label>Minimum Rate ($): </label>
          <input
            type='number'
            value={this.state.minRate}
            onChange={this.onChangeMinRate}
          />
          </div>
          <br />
          <div className='wrapper'>
          <label>Maximum Rate ($): </label>
          <input
            type='number'
            value={this.state.maxRate}
            onChange={this.onChangeMaxRate}
          />
          </div>
          <br />
          <div className='wrapper'>
          <label>Select available days: </label>
          <Select
            isMulti
            name='availableDays'
            options={DAYS_OF_WEEK}
            value={this.state.availability}
            onChange={this.onChangeAvailability}
          />
          </div>
          <br />
          <input className="submit-button" type='submit' value='Search PTs' />
        </form>
        </div>
      </>
    );
  }
}
