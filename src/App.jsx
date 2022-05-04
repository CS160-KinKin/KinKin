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
  Request
} from './components';
import {
  WorkoutList,
  EditWorkoutTask,
  CreateWorkoutTask,
} from './components';
import { render } from '@testing-library/react';

function App() {
  return(
  <Chat />
  )
}

export default App;
