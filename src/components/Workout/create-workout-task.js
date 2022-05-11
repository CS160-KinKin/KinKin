import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createWorkoutTask } from "../../util/workouts";
import axios from "axios";

function CreateWorkoutTask(props) {
  const [task, setTask] = useState({});
  const [content, setContent] = useState('loading');

  const handleCreateSubmit = async (values) => {
    const res = await createWorkoutTask(props.user.token, values);
    if (res.status === STATUS_CODES.OK) {
      setTask(res.data);
      setContent('workout');
    } else {
      setContent('error');
    }
  }

  const handleEditSubmit = async (values) => {
    const res = await editWorkoutTask(props.user.token, values);
    if (res.status === STATUS_CODES.OK) {
      setTask(res.data);
      setContent('workout');
    } else {
      setContent('error');
    }
  }
}

useEffect(() => {
  getPt(props.user.token)
    .then((res) => {
      if (res.status === STATUS_CODES.OK && res.clients.contains(props.user.client)) {
        setTask(res.data);
        setContent('workout');
      } else {
        setContent('error');
      }
    })
    .catch((err) => {
      console.error('Error in useEffect');
      console.error(err);
    });
}, [props.user]);

const getContent = () => {
  switch (content) {
    case 'workout':
      return <div className="mx-auto col-lg-8">
        <h4>Create a new workout task</h4>
        <button className='btn btn-warning'
          onClick={() => setContent('create')}>
          Create Task
        </button>
      </div>;
    case 'loading':
      return <h2>Loading...</h2>;
    default:
      return <h2>Internal server error!</h2>
  }
}

/*
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

    componentDidMount() {
<<<<<<< HEAD
      getPt(props.user.token)
        .then((res) => {
          if (res.status === STATUS_CODES.OK) {
            res.data.pictureUrl = props.user.pictureUrl;
            res.data.name = props.user.publicName;
          } else if (res.status === STATUS_CODES.NOT_FOUND) {
            setProfile({ pictureUrl: props.user.pictureUrl });
            setContent("create");
          } else {
            setContent("error");
          }
        })
        .catch((err) => {
          console.error("Error in create workout task");
          console.error(err);
        });    
=======
        axios
          .get(process.env.REACT_APP_CONTROL_SERVER_URL + "/workouts")
          .then((response) => {
            this.setState({
              title: response.data.title,
              pt: response.data.pt,
              client: response.data.client,
              description: response.data.description,
              duration: response.data.duration,
              date: response.data.date,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
>>>>>>> f807a4cc3fbd52e2ad26df7e5e629456cff39ba7
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
} */