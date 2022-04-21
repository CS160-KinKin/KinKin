import {About, Profile, Marketplace, Home, Login, NotFound, UserDashboard, Chat} from "./components";

import React, {useState} from "react";
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
    Router,
} from "react-router-dom";
import User from "./util/User";
import WorkoutList from "./components/Workout/workout-list";
import EditWorkoutTask from "./components/Workout/edit-workout-task";
import CreateWorkoutTask from "./components/Workout/create-workout-task";

function App() {
  const [user, setUser] = useState(new User());
  if (user.token) {
    return <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Profile" element={<Profile />}/>
      <Route path ="/Marketplace" element={<Marketplace />} />
      <Route
        path="/UserDashboard"
        element={<UserDashboard />}
      />
      <Route path="/workouts" exact element={<WorkoutList user={user} />} />
      <Route path="/workouts/add" element={<CreateWorkoutTask user={user} />} />
      <Route path="/workouts/update" element={<EditWorkoutTask user={user} />} />
      <Route path="/Chat" element={<Chat user={user}/>}/> {/* pass in user info to chat */}
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  } 
  return <Login user={user} setUser={x => setUser(x)} />;
}

export default App;