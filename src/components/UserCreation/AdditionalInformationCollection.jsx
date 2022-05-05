import './AdditionalInformationCollection.css';
import React, { useState } from 'react';
import Select from 'react-select';
import {
  DAYS_OF_WEEK,
  SPECIALTIES,
  LANGUAGES,
  STATUS_CODES,
} from '../../util/constants';
import { createPt } from '../../util/pt';
import { createClient } from '../../util/client';
import { createUser } from '../../util/userFunctions';
import User from '../../util/User';

const AdditionalInformationCollection = (props) => {
  const [username, setUsername] = useState('');
  const [publicName, setPublicName] = useState('');
  const [isPT, setIsPt] = useState(false);
  const [isClient, setIsClient] = useState(false);

  //pt values
  const [PTbio, setPTbio] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [rate, setRate] = useState('');

  //client values
  const [clientBio, setClientBio] = useState('');
  const [interests, setInterests] = useState([]);

  //both values
  const [location, setLocation] = useState();
  const [languages, setLanguages] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userRes = await createUser(props.user.token, {
        username,
        publicName,
        email: props.user.email,
        pictureUrl: props.user.pictureUrl,
      });
      if (userRes.status !== STATUS_CODES.OK) {
        if (userRes.status === STATUS_CODES.CONFLICT) {
          alert('Username is taken');
        } else {
          alert('Server error');
        }
        return;
      }
      if (isPT) {
        const res = await createPt(props.user.token, {
          bio: PTbio,
          specialties,
          availableDays: availability,
          rate,
          location,
          languages,
        });
        if (res.status !== STATUS_CODES.OK) {
          console.error('PT profile not created');
        }
      }
      if (isClient) {
        const res = await createClient(props.user.token, {
          bio: clientBio,
          languages,
          location,
          interests,
        });
        if (res.status !== STATUS_CODES.OK) {
          console.error('Client profile not created');
        }
      }

      const user = new User(userRes.data);
      user.newUser = false;
      props.setUser(user);
    } catch (err) {
      console.error(err);
      return;
    }
  };

  return (
    <div className='infobox'>
      <div className='header'>Let's finish your account setup!</div>
      <form className='user-form' onSubmit={onSubmit}>
        <div className='form-info'>
          <label>Username</label>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-info'>
          <label>Public name</label>
          <input
            type='text'
            placeholder='Public Name'
            value={publicName}
            onChange={(e) => setPublicName(e.target.value)}
          />
        </div>
        <div className='form-info'>
          <label>What languages do you speak?</label>
          <Select
            isMulti
            name='Languages'
            options={LANGUAGES}
            value={languages}
            onChange={(e) => setLanguages(e)}
          />
        </div>
        <div className='cb'>
          <label>Want to be a PT?</label>
          <input
            type='checkbox'
            checked={isPT}
            value={isPT}
            onChange={(e) => setIsPt(e.currentTarget.checked)}
          />
          {isPT ? (
            <>
              <div className='sub-form-info'>
                <label>Personal Trainer Bio</label>
                <textarea
                  className='bio'
                  value={PTbio}
                  onChange={(e) => setPTbio(e.target.value)}
                />
              </div>
              <div className='sub-form-info'>
                <label>What are your specialties?</label>
                <Select
                  isMulti
                  name='Specialties'
                  options={SPECIALTIES}
                  value={specialties}
                  onChange={(e) => setSpecialties(e)}
                />
              </div>
              <div className='sub-form-info'>
                <label>What days are you available?</label>
                <Select
                  isMulti
                  name='availableDays'
                  options={DAYS_OF_WEEK}
                  value={availability}
                  onChange={(e) => setAvailability(e)}
                />
              </div>
              <div className='sub-form-info'>
                <label>What is your marketed rate?</label>
                <input
                  type='number'
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className='cb'>
          <label>Want to be a Client?</label>
          <input
            type='checkbox'
            checked={isClient}
            value={isClient}
            onChange={(e) => setIsClient(e.currentTarget.checked)}
          />
          {isClient ? (
            <>
              <div className='sub-form-info'>
                <label>Client Bio</label>
                <textarea
                  className='bio'
                  value={clientBio}
                  onChange={(e) => setClientBio(e.target.value)}
                />
              </div>
              <div className='sub-form-info'>
                <label>What are your interests?</label>
                <Select
                  isMulti
                  name='Specialties'
                  options={SPECIALTIES}
                  value={interests}
                  onChange={(e) => setInterests(e)}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className='btn-container'>
          {username && publicName ? (
            <input className='btn' type='submit' value='Register' />
          ) : (
            <input disabled className='btn' type='submit' value='Register' />
          )}
        </div>
      </form>
    </div>
  );
};

export default AdditionalInformationCollection;
