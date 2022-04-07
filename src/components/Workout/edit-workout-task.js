import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditWorkoutTask extends Component {
  constructor(props) {
    super(props);

    this.onchangeTitle = this.onchangeTitle.bind(this);
    this.onChangeClient = this.onChangeClient.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      client: "",
      description: "",
      duration: 0,
      date: new Date(),
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/workout/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          title: response.data.title,
          client: response.data.client,
          description: response.data.description,
          duration: response.data.duration,
          date: response.data.date,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeClient(e) {
    this.setState({
      client: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const task = {
      title: this.state.title,
      client: this.state.client,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(task);

    axios
      .post("http://localhost:3000/workout/update", task)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Workout program</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            ></select>
          </div>
          <div className="form-group">
            <label>Client: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.client}
              onChange={this.onChangeClient}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit workout task log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
