import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Footer, Navigation } from '../index';
import { getWorkouts, deleteWorkoutTask } from '../../util/workouts';
import { STATUS_CODES } from '../../util/constants';

const WorkoutTask = (props) => (
  <tr>
    <td>{props.task.title}</td>
    <td>{props.task.client}</td>
    <td>{props.task.description}</td>
    <td>{props.task.duration}</td>
    <td>{new Date(props.task.date).toLocaleDateString()}</td>
    <td>
      <Link className='btn btn-secondary m-1' to={`edit/${props.task._id}`}>
        Edit
      </Link>
      <button
        className='btn btn-danger m-1'
        onClick={() => props.deleteWorkoutTask(props.task._id)}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default class WorkoutList extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.deleteWorkoutTask = this.deleteWorkoutTask.bind(this);
    this.workoutList = this.workoutList.bind(this);

    this.state = { tasks: [] };
  }

  async componentDidMount() {
    const res = await getWorkouts(this.props.user.token);
    if (res.status === STATUS_CODES.OK) {
      this.setState({ tasks: res.data.pt });
    } else {
      console.error('WorkoutList.componentDidMount had an error');
      console.error(res);
    }
  }

  async deleteWorkoutTask(id) {
    const res = await deleteWorkoutTask(this.props.user.token, id);
    if (res.status === STATUS_CODES.OK) {
      this.setState({
        tasks: this.state.tasks.filter((el) => el._id === id),
      });
    } else {
      console.error('WorkoutList.componentDidMount had an error');
      console.error(res);
    }
  }

  workoutList() {
    return this.state.tasks.map((currentTask) => (
      <WorkoutTask
        task={currentTask}
        deleteWorkoutTask={this.deleteWorkoutTask}
        key={currentTask._id}
      />
    ));
  }

  render() {
    return (
      <>
        <Navigation {...this.props} />
        <div className='content'>
          <Link className='btn btn-primary m-2' to='create'>
            Create Workout Task
          </Link>
          <h3>Workout List</h3>
          <table className='table'>
            <thead className='thead-light'>
              <tr>
                <th>Title</th>
                <th>Client</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{this.workoutList()}</tbody>
          </table>
        </div>
        <Footer />
      </>
    );
  }
}
