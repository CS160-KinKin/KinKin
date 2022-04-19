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
} from "react-router-dom";
import User from "./util/User";
import Request from "./components/Requests/Request";

function App() {
  const [user, setUser] = useState(new User());
  // console.log(user.email);
  // I THINK WE NEED TO CONDITIONALLY RENDER THE NAVBAR SO THAT THERE IS NO LOGIN BUTTON WHEN YOU'RE SIGNED IN
  if (user.email) {
    return <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/About" element={<About/>}/>
      <Route
        path="/UserDashboard"
        element={<UserDashboard />}
      />
      <Route path="/requests" element={<Request/>} />
      <Route path="/login" element={<Home/>} />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  }
  else {
    return <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/About" element={<About/>}/>
      <Route
        path="/UserDashboard"
        element={<UserDashboard />}
      />
      <Route path="/login" element={<Login user={user} setUser={x => setUser(x)} />} />
      <Route path="/requests" element={<Request/>} />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  }
  return <Login user={user} setUser={x => setUser(x)} />;
}

export default App;