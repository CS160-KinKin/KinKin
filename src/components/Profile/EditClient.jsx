import React, { Component } from 'react';
import Select from 'react-select';
import { SPECIALTIES, LANGUAGES } from '../../util/constants';

class EditClient extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeBio = this.handleChangeBio.bind(this);
    this.handleChangeInterests = this.handleChangeInterests.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeLanguages = this.handleChangeLanguages.bind(this);

    const { bio } = props.profile;
    const interests = props.profile.interests || [];
    const languages = props.profile.languages || [];

    this.state = {
      bio: bio || '',
      interests: SPECIALTIES.filter((e) => interests.indexOf(e.value) !== -1),
      location: '', // TODO
      languages: LANGUAGES.filter((e) => languages.indexOf(e.value) !== -1),
    };
  }

  handleChangeBio(e) {
    this.setState({
      bio: e.target.value,
    });
  }

  handleChangeInterests(e) {
    this.setState({
      interests: e,
    });
  }

  handleChangeLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }

  handleChangeLanguages(e) {
    this.setState({
      languages: e,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const profile = { ...this.state };
    profile.languages = profile.languages.map((e) => e.value);
    profile.interests = profile.interests.map((e) => e.value);
    this.props.onSubmit(profile);
  }

  render() {
    const { name, pictureUrl } = this.props.profile;
    const { bio, interests, location, languages } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className='mx-auto col-lg-8'>
        <h2>Edit your PT profile</h2>
        <div className='form-group row'>
          <div className='col' />
          <div className='col-sm-2'>
            <img
              className='rounded mx-auto d-block'
              src={pictureUrl || 'blank-profile.png'}
              alt='Profile'
            />
          </div>
          <h3 className='col-sm-2 font-weight-light'>{name || ''}</h3>
          <div className='col' />
        </div>
        <div className='form-group row'>
          <label className='col-sm-2'>Bio</label>
          <textarea
            className='col-sm-6'
            value={bio}
            onChange={this.handleChangeBio}
          />
        </div>
        <div className='form-group row'>
          <label className='col-sm-2'>Interests</label>
          <Select
            isMulti
            className='col-sm-6'
            name='Interests'
            options={SPECIALTIES}
            value={interests}
            onChange={this.handleChangeInterests}
          />
        </div>
        <div className='form-group row'>
          <label className='col-sm-2'>Languages</label>
          <Select
            isMulti
            className='col-sm-6'
            name='Languages'
            options={LANGUAGES}
            value={languages}
            onChange={this.handleChangeLanguages}
          />
        </div>
        <div className='form-group row'>
          {/* TODO */}
          <label className='col-sm-2'>Location</label>
          <select
            disabled
            className='col-sm-6'
            value={location}
            onChange={this.handleChangeLocation}
          >
            <option value='nyc'>New York City, NY, USA</option>
            <option value='la'>Los Angeles, CA, USA</option>
            <option value='austin'>Austin, TX, USA</option>
          </select>
        </div>
        <div className='form-group row'>
          <div className='col' />
          <input
            type='submit'
            className='col-sm-2 btn btn-primary'
            value='Save'
          />
          <input
            type='button'
            className='col-sm-2 btn btn-danger'
            onClick={this.props.onCancel}
            value='Cancel'
          />
          <div className='col' />
        </div>
      </form>
    );
  }
}

export default EditClient;
