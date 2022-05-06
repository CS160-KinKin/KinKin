import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Footer, Navigation } from '../index';
import { getWorkoutsByPtId, deleteWorkoutTask } from '../../util/workouts';

const WorkoutTask = (props) => (
  <tr>
    <td>{props.task.title}</td>
    <td>{props.task.client}</td>
    <td>{props.task.description}</td>
    <td>{props.task.duration}</td>
    <td>{props.task.date.substring(0, 10)}</td>
    <td>
      <Link to={'/edit/' + props.task._id}>edit</Link> |{' '}
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

  async componentDidMount() {
    try {
      const tasks = await getWorkoutsByPtId(this.props.user.token);
      this.setState({ tasks });
    } catch (err) {
      console.log(err.message);
    }
  }

  async deleteWorkoutTask(id) {
    try {
      await deleteWorkoutTask(this.props.user.token, id);
      this.setState({
        tasks: this.state.tasks.filter((el) => el._id === id),
      });
    } catch (err) {
      console.log(err.message);
    }
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
      <>
        <Navigation {...this.props} />
        <div className='content'>
          <h3> Workout List </h3>
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
