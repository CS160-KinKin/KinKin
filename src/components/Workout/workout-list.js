import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const WorkoutTask = (props) => (
  <tr>
    <td>{props.task.title}</td>
    <td>{props.task.client}</td>
    <td>{props.task.description}</td>
    <td>{props.task.duration}</td>
    <td>{props.task.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.task._id}>edit</Link> |{" "}
      <button
        onClick={() => {
          props.deleteWorkoutTask(props.task._id);
        }}
      >
        Delete
      </button>
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
        console.log("querying");
        axios
            .get(process.env.REACT_APP_CONTROL_SERVER_URL + "/workouts/")
            .then((response) => {
                this.setState({ tasks: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteWorkoutTask(id) {
        axios.delete(process.env.REACT_APP_CONTROL_SERVER_URL + "/workouts/" + id).then((response) => {
            console.log(response.data);
        });

        this.setState({
            tasks: this.state.tasks.filter((el) => el._id === id),
        });
    }

    workoutList() {
        console.log(this.state.tasks);
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