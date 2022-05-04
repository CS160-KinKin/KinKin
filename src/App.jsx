import React, { useState } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
  Router,
} from 'react-router-dom';
import User from './util/User';
import {
  About,
  Home,
  Login,
  NotFound,
  UserDashboard,
  Chat,
  Profile,
  Marketplace,
  Request,
  WorkoutList,
  EditWorkoutTask,
  CreateWorkoutTask,
  AdditionalInformationCollection,
} from './components';

function App() {
  const [user, setUser] = useState(new User());

  const handleLogout = () => {
    user.logout();
    setUser(new User());
  };

  if (user.newUser) {
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
          path='/About'
          element={<About user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/Profile'
          element={<Profile user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/Marketplace'
          element={<Marketplace user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/UserDashboard'
          element={<UserDashboard user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/requests'
          element={<Request user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/workouts'
          exact
          element={<WorkoutList user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/workouts/add'
          element={
            <CreateWorkoutTask user={user} handleLogout={handleLogout} />
          }
        />
        <Route
          path='/workouts/update'
          element={<EditWorkoutTask user={user} handleLogout={handleLogout} />}
        />
        <Route
          path='/Chat'
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
          path='/About'
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
