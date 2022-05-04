import './AdditionalInformationCollection.css';
import React, { useState } from 'react';
import Select from 'react-select';
import { DAYS_OF_WEEK, SPECIALTIES, LANGUAGES } from '../../util/constants';

const AdditionalInformationCollection = () => {
    const [username, setUsername] = useState('')
    const [publicName, setpublicName] = useState('')
    const [isPT, setisPT] = useState(false)
    const [isClient, setisClient] = useState(false)

    //pt values
    const [PTbio, setPTbio] = useState('')
    const [specialities, setSpecialities] = useState([])
    const [availability, setAvailability] = useState([])

    //client values
    const [clientBio, setClientBio] = useState('')
    const [interests, setInterests] = useState([])

    //both values
    const [location, setLocation] = useState('')
    const [languages, setLanguages] = useState([])

    const onSubmit = (e) => {
        e.preventDefault()
        if(isTaken(username))
            alert('username taken, please enter different one')

        if(isPT){
            const PT = {
                title: this.state.title,
                languages: languages,
                bio: PTbio,
                specialities: specialities,
                availableDays: availability
            }
        }

        

        //createWorkoutTask(this.props.user.token, task);
        
        window.location = "/workouts";
        
    }
    const isTaken = (username) => {
        if(username === "Josh")
            return true
        return false
    }

    

    return (
        <div className='infobox'> 
            <div className='header'>Let's finish your account setup!</div>
            <form className='user-form' onSubmit={onSubmit}>
            <div className='form-info'>
                <label>Username</label>
                <input type='text' placeholder='Username' value={username} onChange={(e => setUsername(e.target.value))} />
            </div>
            <div className='form-info'>
                <label>Public name</label>
                <input type='text' placeholder='Public Name' value={publicName} onChange={(e => setpublicName(e.target.value))} />
            </div>
            <div className='form-info'>
                    <label>What languages do you speak?</label>
                    <Select
                        isMulti
                        name='Languages'
                        options={LANGUAGES}
                        value={languages}
                        onChange={(e => setLanguages(e))}
                    />
                </div>
            <div className='cb'>
                <label>Want to be a PT?</label>
                <input type='checkbox'
                            checked={isPT}
                            value={isPT}
                            onChange={(e => setisPT(e.currentTarget.checked))} />
            { isPT ? (
                <>
                <div className='sub-form-info'>
                    <label>Personal Trainer Bio</label>
                    <textarea className='bio' value={PTbio} onChange={(e => setPTbio(e.target.value))} />
                </div>
                <div className='sub-form-info'>
                    <label>What are your specialities?</label>
                    <Select
                        isMulti
                        name='Specalities'
                        options={SPECIALTIES}
                        value={specialities}
                        onChange={(e => setSpecialities(e))}
                    />
                </div>
                <div className='sub-form-info'>
                   <label>What days are you available?</label>
                    <Select
                        isMulti
                        name='availableDays'
                        options={DAYS_OF_WEEK}
                        value={availability}
                        onChange={(e => setAvailability(e))}
                    />
                </div>
                </>
                ) : <></>
            }
            </div>
             <div className='cb'>
                <label>Want to be a Client?</label>
                <input type='checkbox'
                        checked={isClient}
                        value={isClient}
                        onChange={(e => setisClient(e.currentTarget.checked))} />
            { isClient ? (
                <>
                <div className='sub-form-info'>
                    <label>Client Bio</label>
                    <textarea className='bio' value={clientBio} onChange={(e => setClientBio(e.target.value))} />
                </div>
                <div className='sub-form-info'>
                    <label>What are your interests?</label>
                    <Select
                        isMulti
                        name='Specialties'
                        options={SPECIALTIES}
                        value={interests}
                        onChange={(e => setInterests(e))}
                    />
                </div>
                </>
                ) : <></>
            }
             </div>
             <div className='btn-container'>
            {username && publicName && languages.length && ((isPT && PTbio && specialities.length && availability.length && !isClient) || (isClient && clientBio && interests.length && !isPT) || (isPT && isClient  && clientBio && interests.length && PTbio && specialities.length && availability.length)) ? 
             <input className='btn' type='submit' value='Register'/> :  <input className='btn' type='submit' value='Register'/>}
             </div>
            </form>
        </div>
    );
};

export default AdditionalInformationCollection;