import {About, Profile, Marketplace, Home, Login, NotFound} from "./components";
import {Route, Routes} from "react-router-dom";
import React from "react";

import './App.css';

function App() {
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path ="/Profile" element={<Profile />} />
          <Route path ="/Marketplace" element={<Marketplace />} />
          <Route path ="/About" element={<About />} />
          <Route path ="/Login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
          );
}

export default App;