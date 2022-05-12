import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Footer, Navigation } from '../index';
import ClientProfile from '../Profile/ClientProfile';
import EditClient from '../Profile/EditClient';
import { getClient, createClient, editClient } from '../../util/client';
import { STATUS_CODES } from '../../util/constants';

function ClientDashboard(props) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [content, setContent] = useState('loading');

  const handleCreateSubmit = async (values) => {
    const res = await createClient(props.user.token, values);
    if (res.status === STATUS_CODES.OK) {
      res.data.pictureUrl = props.user.pictureUrl;
      res.data.name = props.user.publicName;
      setProfile(res.data);
      setContent('dashboard');
    } else {
      setContent('error');
    }
  };

  const handleEditSubmit = async (values) => {
    const res = await editClient(props.user.token, values);
    if (res.status === STATUS_CODES.OK) {
      res.data.pictureUrl = props.user.pictureUrl;
      res.data.name = props.user.publicName;
      setProfile(res.data);
      setContent('dashboard');
    } else {
      setContent('error');
    }
  };

  useEffect(() => {
    getClient(props.user.token)
      .then((res) => {
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

  const getRating = () => {
    const positive = profile.positiveRatingCount || 0;
    const total = positive + (profile.negativeRatingCount || 0);
    if (total === 0) return 'no ratings';
    return `${parseInt((positive * 100) / total)}%`;
  };

  const getContent = () => {
    switch (content) {
      case 'dashboard':
        return (
          <div className='mx-auto col-lg-8'>
            <ClientProfile {...profile} />
            <div className='row'>
              <div className='col' />
              <h4 className='col-lg-8'>Approval Rating: {getRating()}</h4>
              <div className='col' />
            </div>
            <div>
              <Link className='btn btn-primary' to='workouts'>
                View your workouts
              </Link>
              <Link className='btn btn-success' to='healthinput'>
                {/* TODO */}
                Input health data
              </Link>
              <Link className='btn btn-info' to='activity'>
                {/* TODO */}
                View your activity
              </Link>
              <Link className='btn btn-secondary' to='marketplace'>
                View the PT marketplace
              </Link>
              <button
                className='btn btn-warning'
                onClick={() => setContent('edit')}
              >
                Edit Profile
              </button>
            </div>
          </div>
        );
      case 'edit':
        return (
          <EditClient
            profile={profile}
            onSubmit={handleEditSubmit}
            onCancel={() => setContent('dashboard')}
          />
        );
      case 'create':
        return (
          <>
            <h2>Become a client!</h2>
            <EditClient
              profile={profile}
              onSubmit={handleCreateSubmit}
              onCancel={() => navigate(-1)}
            />
          </>
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
