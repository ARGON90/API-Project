import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div>
      <ul className='padding-remove'>
        <li id='container'>
          <div>
            <NavLink exact to="/">Home</NavLink>
          </div>
          <div className='flex-box justify-content-center'>
            <div id='search-bar'>
              Search Bar
            </div>
          </div>
          <div id='sessionLinks' className='align-items-center'>
            {isLoaded && sessionLinks}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
