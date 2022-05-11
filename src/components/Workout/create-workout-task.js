import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createWorkoutTask } from "../../util/workouts";

export default class CreateWorkoutTask extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
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

    /*
    We need the user in place to decide how to route programs
    */
    componentDidMount() {
        // todo
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
            clientId: this.state.client,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        };

        createWorkoutTask(this.props.user.token, task);
        
        window.location = "/client/workouts";
    }

    render() {
        return (
          <div>
            <h3>Add new task to Workout program</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Title: </label>
                <input
                  ref="text"
                  required
                  className="form-control"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                / >
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
                  value="Create workout task log"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        );
    }
}