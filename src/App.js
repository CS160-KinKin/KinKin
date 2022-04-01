import {About, Home, Login, NotFound} from "./components";
import {Route, Routes} from "react-router-dom";
import React from "react";

import './App.css';

function App() {
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path ="/About" element={<About />} />
          <Route path ="/Login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
          );
}

export default App;