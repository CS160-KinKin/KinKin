import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import User from './util/User';
import {
  About,
  Home,
  Login,
  NotFound,
  PtDashboard,
  Chat,
  Marketplace,
  WorkoutList,
  EditWorkoutTask,
  CreateWorkoutTask,
  AdditionalInformationCollection,
  Request,
  ClientDashboard,
  Activity,
  HealthInput,
} from './components';

function App() {
  const [user, setUser] = useState(new User());
  const handleLogout = () => {
    user.logout();
    setUser(new User());
  };

  if (user.token && user.newUser) {
    return (
      <AdditionalInformationCollection
        user={user}
        setUser={(o) => setUser(o)}
      />
    );
  }

  if (user.token) {
    return (
      <Routes>
        <Route
          path='/'
          element={<Home user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/about'
          element={<About user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/pt'
          exact
          element={<PtDashboard user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/pt/requests'
          element={
            <Request user={user} type='PT' handleLogout={handleLogout} />
          }
        />
        <Route
          path='/client'
          exact
          element={<ClientDashboard user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/client/requests'
          element={
            <Request user={user} type='CLIENT' handleLogout={handleLogout} />
          }
        />
        <Route
          path='/client/activity'
          element={<Activity user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='client/healthinput'
          element={<HealthInput user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/client/marketplace'
          element={<Marketplace user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/client/workouts'
          element={
            <WorkoutList user={user} handleLogout={handleLogout} isPt={false} />
          }
        />
        <Route
          path='/pt/workouts'
          exact
          element={
            <WorkoutList user={user} handleLogout={handleLogout} isPt={true} />
          }
        />
        <Route
          path='/pt/workouts/create'
          element={
            <CreateWorkoutTask user={user} handleLogout={handleLogout} />
          }
        />
        <Route
          path='/pt/workouts/edit/:taskId'
          element={<EditWorkoutTask user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/chat'
          element={<Chat user={user} handleLogout={handleLogout} />}
        />
        <Route path='*' element={<NotFound user={user} />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route
          path='/'
          element={<Home user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/about'
          element={<About user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/login'
          element={
            <Login user={user} setUser={setUser} handleLogout={handleLogout} />
          }
        />
        <Route
          path='*'
          element={<NotFound user={user} handleLogout={handleLogout} />}
        />
      </Routes>
    );
  }
}

export default App;
