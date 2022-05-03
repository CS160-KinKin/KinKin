import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation(props) {
  return (
    <nav className='row header navbar navbar-expand navbar-dark blue'>
      <div className='container'>
        <NavLink className='navbar-brand' to='/'>
          <b>Kin Kin</b>
        </NavLink>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/'>
              Home
              <span className='sr-only'>(current)</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/about'>
              About
            </NavLink>
          </li>
          {props.user && props.user.token ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/marketplace">
                  Marketplace
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activity">
                  Activity
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/workouts'>
                  Workout
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/chat'>
                  Chat
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  className='nav-link'
                  to='/login'
                  onClick={props.handleLogout}
                >
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <li className='nav-item'>
              <NavLink className='nav-link' to='/login'>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
