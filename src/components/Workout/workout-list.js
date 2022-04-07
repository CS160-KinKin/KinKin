import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const WorkoutTask = (props) => (
  <tr>
    <td>{props.workouttask.title}</td>
    <td>{props.workouttask.client}</td>
    <td>{props.workouttask.description}</td>
    <td>{props.workouttask.duration}</td>
    <td>{props.workouttask.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.workouttask._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteWorkoutTask(props.workouttask._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class WorkoutList extends Component {
    constructor(props) {
        super(props);

        this.deleteWorkoutTask = this.deleteWorkoutTask.bind(this);

        this.state = { tasks: [] };
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/workouts/")
            .then((response) => {
                this.setState({ tasks: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteWorkoutTask(id) {
        axios.delete("http://localhost:5000/workouts/" + id).then((response) => {
            console.log(response.data);
        });

        this.setState({
            tasks: this.state.tasks.filter((el) => el._id == id),
        });
    }

    workoutList() {
        return this.state.tasks.map((currenttask) => {
            return (
                <WorkoutTask
                    task={currenttask}
                    deleteWorkoutTask={this.deleteWorkoutTask}
                    key={currenttask._id}
                />
            );
        });
    }

    render() {
        return (
          <div>
            <h3> Workout List </h3>
            <table className="table">
              <thread className="thead-light">
                <tr>
                  <th>Title</th>
                  <th>Client</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Date</th>
                </tr>
              </thread>
              <tbody>{ this.workoutList()}</tbody>  
            </table>
          </div>
        );
    }
}