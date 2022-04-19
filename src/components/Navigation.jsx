import React from "react";
import {NavLink} from "react-router-dom";

const toggleLogInModal = async () => {
  
}

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark orange">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <b>Kin Kin</b>
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Log In
                </NavLink>
              </li>
              {/* <button className="btn" onClick={toggleLogInModal}>Log In</button> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
