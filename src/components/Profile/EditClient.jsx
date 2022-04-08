import React, { Component } from "react";
//import axios from "axios";

class EditClient extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);
    this.onChangeInterests = this.onChangeInterests.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);

    this.state = {
      name: "",
      bio: "",
      interests: "",
      location: "",
      language: "",
    };
  }

  /*componentDidMount() {
    axios
      .get("https://localhost:3000/profile/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          bio: response.data.bio,
          interests: response.data.interests,
          location: response.data.location,
          language: response.data.language,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }*/

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeBio(e) {
    this.setState({
      bio: e.target.value
    });
  }

  onChangeInterests(e) {
    this.setState({
      interests: e.target.value
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  onChangeLanguage(e) {
    this.setState({
      language: e.target.value
    });
  }

  /*onSubmit(e) {
    e.preventDefault();

    const task = {
      name: this.state.name,
      bio: this.state.bio,
      interests: this.state.interests,
      location: this.state.location,
      language: this.state.language,
    };

    console.log(task);

    axios
      .post("https://localhost:3000/profile/edit", task)
      .then((res) => console.log(res.data));

    window.location = "/";
  }*/

  render() {
    return (
      <div>
        <h2>Edit Profile</h2>
        <form onSubmit={this.onSubmit}>
          <img src="blank-profile.png" alt="Profile Picture" width="100" /><br /><br />
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Bio: </label>
            <input
              type="text"
              value={this.state.bio}
              onChange={this.onChangeBio}
            />
          </div>
          <div className="form-group">
            <label>Interests: </label>
            <input
              type="text"
              value={this.state.interests}
              onChange={this.onChangeInterests}
            />
          </div>
          <div className="form-group">
            <label>Location: </label>
            <select value={this.state.location} onChange={this.onChangeLocation}>
              <option value="nyc">New York City, NY, USA</option>
              <option value="la">Los Angeles, CA, USA</option>
              <option value="austin">Austin, TX, USA</option>
            </select>
          </div>
          <div className="form-group">
            <label>Language: </label>
            <select value={this.state.language} onChange={this.onChangeLanguage}>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="chinese">Chinese</option>
            </select>
          </div>
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default EditClient;