import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoIndex from '../LoginFormModal/DemoIndex'
import { sessionUserId } from '../../store/session';
import { getState } from '../../store/session';
import './Navigation.css';
import '../../index.css'


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch()

  let sessionId;
  if (sessionUserId && sessionUserId.user) {
    sessionId = sessionUserId.user.id
  }


  useEffect(() => {
    console.log('NAVIGATION GETSTATE USE EFFECT ')
    dispatch(getState())
  }, [dispatch, sessionId])


  function sess() {
    dispatch(getState())
    console.log('HELLO!!! INSIDE SESS')
    if (sessionUserId && sessionUserId.user) {
      sessionId = sessionUserId.user.id
    } return (
      <div>hello</div>
    )
  }

  console.log('SESSIONID', sessionId)

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

  const hi = () => {
    return (
      <p>hi!!</p>
      )
  }



  return (
      <div className='font-family'>
        <ul className='padding-remove'>
          <li id='container'>
            <div className='flex-box column-gap'>
            {hi}
            <div>hello</div>
              <NavLink exact to="/spots">Home Logo</NavLink>
              <NavLink to="/create">Create Your Spot!</NavLink>
              {sessionId && (
                <NavLink to="/spots/current">Current User Spots</NavLink>
              )}
              {sess}
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
