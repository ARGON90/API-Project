import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoIndex from '../LoginFormModal/DemoIndex'
import './Navigation.css';
import '../../index.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <DemoIndex />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='font-family'>
      <ul className='padding-remove'>
        <li id='container'>
          <div className='flex-box column-gap'>
            <NavLink exact to="/spots">Home Logo</NavLink>
            <NavLink to="/create">Create Your Spot!</NavLink>
          </div>
          <div className='flex-box justify-content-center'>
            <div id='search-bar'>
              Search...
            </div>
          </div>
          <div className='flex-box row-reverse column-gap
          align-items-center'>
            {isLoaded && sessionLinks}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
