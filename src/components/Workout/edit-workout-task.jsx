import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateWorkoutTask, getWorkouts } from '../../util/workouts';
import { getClientById } from '../../util/client';
import { STATUS_CODES } from '../../util/constants';
import { Navigation, Footer } from '..';
import { getPt } from '../../util/pt';

const EditWorkoutTask = (props) => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [title, setTitle] = useState('');
  const [client, setClient] = useState({ value: {}, label: '' });
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [clientList, setClientList] = useState([]);

  useEffect(
    () =>
      getWorkouts(props.user.token, { taskId }).then(async (res) => {
        if (res.status === STATUS_CODES.OK && res.data.pt.length === 1) {
          const task = res.data.pt[0];
          setTitle(task.title);
          setClient({ value: task.client, label: task.client.publicName });
          setDescription(task.description);
          setDuration(task.duration);
          setDate(Date.parse(task.date));
          const ptRes = await getPt(props.user.token);
          if (ptRes.status === STATUS_CODES.OK) {
            const ourClients = [];
            for (const clientId of ptRes.data.clients) {
              const clientRes = await getClientById(props.user.token, clientId);
              if (clientRes.status === STATUS_CODES.OK) {
                ourClients.push({
                  label: clientRes.data.publicName,
                  value: clientRes.data,
                });
              }
            }
            setClientList(ourClients);
          }
        } else {
          console.error(`edit-workout-task had an error: ${res}`);
        }
      }),
    [taskId, props.user]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateWorkoutTask(props.user.token, {
      id: taskId,
      title,
      client: client.value.id,
      description,
      duration,
      date,
    });
    if (res.status === STATUS_CODES.OK) {
      navigate(-1);
    } else {
      alert('Could not edit task');
      console.error(res);
    }
  };

  return (
    <>
      <Navigation {...props} />
      <form onSubmit={handleSubmit} className='mx-auto col-lg-8'>
        <h2>Edit client's workout task</h2>
        <div className='form-group row'>
          <div className='col' />
          <div className='col-sm-2'>
            <img
              className='rounded mx-auto d-block'
              src={client.value.pictureUrl || 'blank-profile.png'}
              alt='Client profile'
            />
          </div>
          <h3 className='col-sm-2 font-weight-light'>
            {client.value.publicName || 'no client name'}
          </h3>
          <div className='col' />
        </div>
        <div className='form-group row'>
          <label className='col-sm-2'>Title</label>
          <textarea
            className='col-sm-6'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-group row'>
          <label className='col-sm-2'>Description</label>
          <textarea
            className='col-sm-6'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-group row'>
          <label className='col-sm-2'>Duration (minutes)</label>
          <input
            className='col-sm-6'
            type='number'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className='form-group row'>
          <DatePicker selected={date} onChange={(e) => setDate(e)} />
        </div>
        <div className='form-group row'>
          <label className='col-sm-2'>Client</label>
          <Select
            className='col-sm-6'
            name='availableClients'
            options={clientList}
            value={client}
            onChange={(o) => setClient(o)}
          />
        </div>
        <div className='form-group row'>
          <div className='col' />
          <input
            type='submit'
            className='col-sm-2 btn btn-primary'
            value='Save'
          />
          <input
            type='button'
            className='col-sm-2 btn btn-danger'
            onClick={() => navigate(-1)}
            value='Cancel'
          />
          <div className='col' />
        </div>
      </form>
      <Footer />
    </>
  );
};

export default EditWorkoutTask;
