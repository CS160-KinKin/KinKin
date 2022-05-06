import React, { useState, useEffect } from 'react';
import { Footer, Navigation, Request } from '../index';
import PTProfile from '../Profile/PTProfile';
import EditPT from '../Profile/EditPT';
import { getPt, createPt, editPt } from '../../util/pt';
import { STATUS_CODES } from '../../util/constants';

function ClientDashboard(props) {
  const [profile, setProfile] = useState({});
  const [content, setContent] = useState('loading');

  const handleCreateSubmit = async (values) => {
    try {
      const res = await createPt(props.user.token, values);
      if (res.status === STATUS_CODES.OK) {
        res.data.pictureUrl = props.user.pictureUrl;
        res.data.name = props.user.publicName;
        setProfile(res.data);
        setContent('dashboard');
      } else {
        setContent('error');
      }
    } catch (err) {
      console.error('Error in handleCreateSubmit');
      console.error(err);
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      const res = await editPt(props.user.token, values);
      if (res.status === STATUS_CODES.OK) {
        res.data.pictureUrl = props.user.pictureUrl;
        res.data.name = props.user.publicName;
        setProfile(res.data);
        setContent('dashboard');
      } else {
        setContent('error');
      }
    } catch (err) {
      console.error('Error in handleEditSubmit');
      console.error(err);
    }
  };

  useEffect(() => {
    getPt(props.user.token)
      .then((res) => {
        console.log(res.data);
        if (res.status === STATUS_CODES.OK) {
          res.data.pictureUrl = props.user.pictureUrl;
          res.data.name = props.user.publicName;
          setProfile(res.data);
          setContent('dashboard');
        } else if (res.status === STATUS_CODES.NOT_FOUND) {
          setProfile({ pictureUrl: props.user.pictureUrl });
          setContent('create');
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
      case 'dashboard':
        return (
          <div className='center'>
            <PTProfile {...profile} />
            <div>
              <button onClick={() => setContent('requests')}>
                View your client requests
              </button>
              <button onClick={() => setContent('edit')}>Edit Profile</button>
            </div>
          </div>
        );
      case 'requests':
        return (
          <Request user={props.user} back={() => setContent('dashboard')} />
        );
      case 'edit':
        return (
          <EditPT
            profile={profile}
            handleEditSubmit={handleEditSubmit}
            back={() => setContent('dashboard')}
          />
        );
      case 'create':
        return (
          <EditPT
            profile={profile}
            handleEditSubmit={handleCreateSubmit}
            back={() => setContent('dashboard')}
          />
        );
      case 'loading':
        return <h2>Loading...</h2>;
      default:
        return <h2>Internal server error! 😰</h2>;
    }
  };

  return (
    <>
      <Navigation {...props} />
      <div className='content'>{getContent()}</div>
      <Footer {...props} />
    </>
  );
}

export default ClientDashboard;
