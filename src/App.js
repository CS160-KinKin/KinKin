import './App.css';
import {About, Footer, Home, Login, Navigation} from "./components";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";

function App() {
  return (
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path ="/About" element={<About />} />
          <Route path ="/Login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;
