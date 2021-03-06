import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Footer, Navigation } from '../index';
import { getWorkouts, deleteWorkoutTask } from '../../util/workouts';
import { STATUS_CODES } from '../../util/constants';

const WorkoutTask = (props) => (
  <tr>
    <td>{props.task.title}</td>
    {props.isPt ? <td>{props.task.client.publicName}</td> : <></>}
    <td>{props.task.description}</td>
    <td>{props.task.duration}</td>
    <td>{new Date(Date.parse(props.task.date)).toLocaleDateString()}</td>
    {props.isPt ? (
      <td>
        <Link className='btn btn-secondary m-1' to={`edit/${props.task._id}`}>
          Edit
        </Link>
        <button
          className='btn btn-danger m-1'
          onClick={() => props.onDelete(props.task._id)}
        >
          Delete
        </button>
      </td>
    ) : (
      <></>
    )}
  </tr>
);

export default class WorkoutList extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.workoutList = this.workoutList.bind(this);

    this.state = { tasks: [] };
  }

  async componentDidMount() {
    const res = await getWorkouts(this.props.user.token);
    if (res.status === STATUS_CODES.OK) {
      this.setState({ tasks: this.props.isPt ? res.data.pt : res.data.client });
    } else {
      console.error('WorkoutList.componentDidMount had an error');
      console.error(res);
    }
  }

  async handleDelete(id) {
    const res = await deleteWorkoutTask(this.props.user.token, id);
    if (res.status === STATUS_CODES.OK) {
      this.setState({
        tasks: this.state.tasks.filter((el) => el._id !== id),
      });
    } else {
      console.error('WorkoutList.componentDidMount had an error');
      console.error(res);
    }
  }

  workoutList() {
    return (
      <>
        {this.state.tasks.map((currentTask) => (
          <WorkoutTask
            task={currentTask}
            onDelete={this.handleDelete}
            key={currentTask._id}
            isPt={this.props.isPt}
          />
        ))}
      </>
    );
  }

  render() {
    return (
      <>
        <Navigation {...this.props} />
        <div className='content mx-auto col-lg-8'>
          <div className='row m-4'>
            <div className='col' />
            {this.props.isPt ? (
              <>
                <Link className='btn btn-primary col-md-4' to='create'>
                  Create Workout Task
                </Link>
                <Link className='btn btn-secondary col-md-4' to='/pt'>
                  Back to dashboard
                </Link>
              </>
            ) : (
              <Link className='btn btn-primary col-md-4' to='/client'>
                Back to dashboard
              </Link>
            )}
            <div className='col' />
          </div>
          <h3>Workout List</h3>
          <table className='table'>
            <thead className='thead-light'>
              <tr>
                <th>Title</th>
                {this.props.isPt ? <th>Client</th> : <></>}
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                {this.props.isPt ? <th /> : <></>}
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
