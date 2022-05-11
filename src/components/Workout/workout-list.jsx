import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Footer, Navigation } from '../index';
import { getWorkouts, deleteWorkoutTask } from '../../util/workouts';

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

    this.deleteWorkoutTask = this.deleteWorkoutTask.bind(this);

    this.state = { tasks: [] };
  }

  async componentDidMount() {
    try {
      const { pt } = await getWorkouts(this.props.user.token);
      this.setState({ tasks: pt });
      throw Error('test');
    } catch (err) {
      console.error(
        `WorkoutList.componentDidMount had an error: ${err.message}`
      );
    }
  }

  async deleteWorkoutTask(id) {
    try {
      await deleteWorkoutTask(this.props.user.token, id);
      this.setState({
        tasks: this.state.tasks.filter((el) => el._id === id),
      });
    } catch (err) {
      console.error(
        `WorkoutList.deleteWorkoutTask had an error: ${err.message}`
      );
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
            <thread className='thead-light'>
              <tr>
                <th>Title</th>
                <th>Client</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
              </tr>
            </thread>
            <tbody>{this.workoutList()}</tbody>
          </table>
        </div>
        <Footer />
      </>
    );
  }
}
