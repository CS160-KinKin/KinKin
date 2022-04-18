import {About, Profile, Home, Login, NotFound, UserDashboard} from "./components";
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
  if (user.email) {
    return <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/About" element={<About/>}/>
      <Route
        path="/UserDashboard"
        element={<UserDashboard />}
      />
      <Route path="/workouts" exact component={WorkoutList} />
      <Route path="/workouts/add" component={CreateWorkoutTask} />
      <Route path="/workouts/update" component={EditWorkoutTask} />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  }
  return <Login user={user} setUser={x => setUser(x)} />;
}

export default App;